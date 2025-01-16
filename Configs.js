// Array to store configurations
  let configurations = [
  {
	name: "57.SV9C.418.RRU1 R4",
	work_number: 4021,
	bar_length: 30,
	part_length: 0.28,
	part_off: 0.025,
	extra: 0.001,
	extra_s: 0.0002,
	leftover: 0.38,
	zero: -2.22,
	order_qty: 0
  },
  {
	name: "57.SV9C.418.ELT1 R4",
	work_number: 4020,
	bar_length: 30,
	part_length: 0.68,
	part_off: 0.059,
	extra: 0.001,
	extra_s: 0.0002,
	leftover: 0.38,
	zero: -2.22,
	order_qty: 0
  }
];

window.onload = function() {
	const select = document.getElementById("configurations");

configurations.forEach((config, index) => {
	  const option = document.createElement("option");
	  option.value = index;
	  option.textContent = config.name;
	  select.appendChild(option);
	});
  };

  

  function saveConfiguration() {
	const configName = document.getElementById("config_name").value;
	if (!configName) {
	  alert("Please enter a Part Number to save the configuration.");
	  return;
	}

	// Get form values
	const config = {
	  name: configName,
	  work_number: parseFloat(document.getElementById("work_number").value),
	  bar_length: parseFloat(document.getElementById("bar_length").value),
	  part_length: parseFloat(document.getElementById("part_length").value),
	  part_off: parseFloat(document.getElementById("part_off").value),
	  extra: parseFloat(document.getElementById("extra").value),
	  extra_s: parseFloat(document.getElementById("extra_s").value),
	  leftover: parseFloat(document.getElementById("leftover").value),
	  zero: parseFloat(document.getElementById("zero").value),
	  order_qty: parseFloat(document.getElementById("order_qty").value),
	};

	// Save configuration
	configurations.push(config);

	// Update dropdown
	const select = document.getElementById("configurations");
	const option = document.createElement("option");
	option.value = configurations.length - 1; // Index of the configuration
	option.textContent = config.name;
	select.appendChild(option);

	alert(`Configuration "${configName}" saved successfully!`);
  }

  function loadConfiguration() {
	const select = document.getElementById("configurations");
	const selectedIndex = select.value;
	if (selectedIndex === "") return;

	const config = configurations[selectedIndex];

	// Load values into form
	document.getElementById("work_number").value = config.work_number || 0;
	document.getElementById("bar_length").value = config.bar_length;
	document.getElementById("part_length").value = config.part_length;
	document.getElementById("part_off").value = config.part_off;
	document.getElementById("extra").value = config.extra;
	document.getElementById("extra_s").value = config.extra_s;
	document.getElementById("leftover").value = config.leftover;
	document.getElementById("zero").value = config.zero;
	document.getElementById("order_qty").value = config.order_qty;

	alert(`Configuration "${config.name}" loaded successfully!`);
  }
  
  
 function generateFormattedText() {
  const inputs = {
  "name": `"${document.getElementById("config_name").value}",`,
  "work_number": `${document.getElementById("work_number").value},`,
  "bar_length": `${document.getElementById("bar_length").value},`,
  "part_length": `${document.getElementById("part_length").value},`,
  "part_off": `${document.getElementById("part_off").value},`,
  "extra": `${document.getElementById("extra").value},`,
  "extra_s": `${document.getElementById("extra_s").value},`,
  "leftover": `${document.getElementById("leftover").value},`,
  "zero": `${document.getElementById("zero").value},`,
  "order_qty": document.getElementById("order_qty").value
};

  let formattedText = "";
  for (const [key, value] of Object.entries(inputs)) {
	formattedText += `${key}: ${value}\n`;
  }

  document.getElementById("formattedText").value = formattedText;
}