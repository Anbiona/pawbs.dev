async function updateBedtimeStatus() {
  try {
    const res = await fetch("/api/bedtime");
    const data = await res.json();

    const statusEl = document.getElementById("bedtime-status");
    const updatedEl = document.getElementById("bedtime-updated");

    statusEl.textContent = data.bedtime_mode === "on"
      ? "[ SLEEPING ]"
      : data.bedtime_mode === "off"
      ? "[ AWAKE ]"
      : "No data yet";

    if (data.updated) {
      const time = new Date(data.updated).toLocaleTimeString();
      updatedEl.textContent = `Last updated: ${time}`;
    }
  } catch (err) {
    console.error("Failed to fetch bedtime status:", err);
  }
}

updateBedtimeStatus();
setInterval(updateBedtimeStatus, 10000);