use std::time::{Duration, Instant};

#[derive(serde::Serialize)]
struct ApiPing {
  ok: bool,
  latency_ms: u64,
  url: String,
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
    .unwrap_or("https://api.futhero.com.br/api/v1/");

  for url in candidates {
    last_url = url;
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
    url: last_url.to_string(),
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
    .invoke_handler(tauri::generate_handler![ping_api])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
