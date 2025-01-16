// This function will be called when the button is clicked
async function saveConfiguration() {
  const formData = {
    config_name: document.getElementById("config_name").value,
    work_number: document.getElementById("work_number").value,
    bar_length: document.getElementById("bar_length").value,
    part_length: document.getElementById("part_length").value,
    part_off: document.getElementById("part_off").value,
    extra: document.getElementById("extra").value,
    extra_s: document.getElementById("extra_s").value,
    leftover: document.getElementById("leftover").value,
    zero: document.getElementById("zero").value,
    order_qty: document.getElementById("order_qty").value,
  };

  const apiUrl = "https://ppzkq5wi5e.execute-api.us-east-2.amazonaws.com/"; // Replace with your actual API Gateway URL.

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Data submitted successfully!");
    } else {
      alert("Failed to submit data.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error submitting data.");
  }
}