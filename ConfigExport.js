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

  console.log("Form data being sent:", formData); // Log the form data to check

  const apiUrl = "http://3.133.129.202:3000/submit"; // Replace <your-ec2-public-ip>
; // Replace with your actual API Gateway URL.

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
      const errorText = await response.text();
      console.error("Failed to submit data:", errorText);
      alert("Failed to submit data.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error submitting data.");
  }
}
