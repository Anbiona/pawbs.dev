async function updateBedtimeStatus() {
  try {
    const res = await fetch("/api/bedtime");
    const data = await res.json();

    const statusEl = document.getElementById("bedtime-status");
    const updatedEl = document.getElementById("bedtime-updated");

    if (data.bedtime_mode === "on") {
      statusEl.textContent = "[ SLEEPING ]";
      statusEl.style.color = "#f4b400"; // yellow
    } else if (data.bedtime_mode === "off") {
      statusEl.textContent = "[ AWAKE ]";
      statusEl.style.color = "#34a853"; // green
    } else {
      statusEl.textContent = "[ UNKNOWN ]";
      statusEl.style.color = "#ea4335";
    }

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