use std::time::{Duration, Instant};

#[derive(serde::Serialize)]
struct ApiPing {
  ok: bool,
  latency_ms: u64,
  url: String,
}

#[derive(serde::Serialize, serde::Deserialize, Clone)]
struct Room {
  id: String,
  name: String,
  mode: String,
  is_active: bool,
  is_public: bool,
  max_players: i32,
  players_online: i32,
  room_link: Option<String>,
}

#[derive(serde::Deserialize)]
struct RoomsResponse {
  data: Vec<Room>,
}

#[derive(serde::Serialize)]
struct RoomsPayload {
  ok: bool,
  latency_ms: u64,
  url: String,
  rooms: Vec<Room>,
}

#[tauri::command]
async fn ping_api() -> Result<ApiPing, String> {
  let client = reqwest::Client::builder()
    .timeout(Duration::from_secs(4))
    .build()
    .map_err(|e| e.to_string())?;

  let candidates: &[&str] = if cfg!(debug_assertions) {
    &["http://localhost:3000/api/v1/"]
  } else {
    &["https://api.futhero.com.br/api/v1/"]
  };

  let mut last_latency_ms: u64 = 0;
  let mut last_url = candidates
    .first()
    .copied()
    .unwrap_or("https://api.futhero.com.br/api/v1/")
    .to_string();

  for url in candidates {
    last_url = (*url).to_string();
    let started = Instant::now();

    let response = match client.get(*url).send().await {
      Ok(r) => r,
      Err(_) => {
        last_latency_ms = started.elapsed().as_millis() as u64;
        continue;
      }
    };

    last_latency_ms = started.elapsed().as_millis() as u64;

    if !response.status().is_success() {
      continue;
    }

    let value: serde_json::Value = response.json().await.unwrap_or(serde_json::Value::Null);
    let ok = value.get("status").and_then(|s| s.as_str()) == Some("ok");
    if ok {
      return Ok(ApiPing {
        ok: true,
        latency_ms: last_latency_ms,
        url: (*url).to_string(),
      });
    }
  }

  Ok(ApiPing {
    ok: false,
    latency_ms: last_latency_ms,
    url: last_url,
  })
}

#[tauri::command]
async fn list_rooms() -> Result<RoomsPayload, String> {
  let client = reqwest::Client::builder()
    .timeout(Duration::from_secs(6))
    .build()
    .map_err(|e| e.to_string())?;

  let candidates: &[&str] = if cfg!(debug_assertions) {
    &["http://localhost:3000/api/v1/", "https://api.futhero.com.br/api/v1/"]
  } else {
    &["https://api.futhero.com.br/api/v1/"]
  };

  let mut last_latency_ms: u64 = 0;
  let mut last_url = candidates
    .first()
    .copied()
    .unwrap_or("https://api.futhero.com.br/api/v1/")
    .to_string();

  for base_url in candidates {
    let url = format!("{base_url}rooms");
    last_url = url.clone();
    let started = Instant::now();

    let response = match client.get(&url).send().await {
      Ok(r) => r,
      Err(_) => {
        last_latency_ms = started.elapsed().as_millis() as u64;
        continue;
      }
    };

    last_latency_ms = started.elapsed().as_millis() as u64;

    if !response.status().is_success() {
      continue;
    }

    let parsed: Result<RoomsResponse, _> = response.json().await;
    if let Ok(payload) = parsed {
      return Ok(RoomsPayload {
        ok: true,
        latency_ms: last_latency_ms,
        url,
        rooms: payload.data,
      });
    }
  }

  Ok(RoomsPayload {
    ok: false,
    latency_ms: last_latency_ms,
    url: last_url,
    rooms: vec![],
  })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![ping_api, list_rooms])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
