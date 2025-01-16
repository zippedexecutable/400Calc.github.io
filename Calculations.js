document.querySelectorAll('input').forEach(input => {
			input.addEventListener('focus', function () {
				this.select(); // Select all text when input is focused
			});
		});


	function drawBar(parts, shift, barLength, leftover) {
	const canvas = document.getElementById('barCanvas');
	const ctx = canvas.getContext('2d');
	const canvasWidth = canvas.clientWidth;
	const canvasHeight = canvas.clientHeight;

	// Adjust canvas dimensions
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	// Calculate scaling factor to fit the bar in the canvas
	const scaleFactor = canvasWidth / barLength;

	// Clear the canvas
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	// Draw the bar
	ctx.fillStyle = '#f5e6ca'; // Bar color
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	// Set border style
	ctx.strokeStyle = '#f5e6ca'; // Border color
	ctx.lineWidth = 0.5; // Finer outline

	// Draw parts
	const partWidth = shift * scaleFactor;
	for (let i = 0; i < parts; i++) {
		const x = i * partWidth;
		if (x + partWidth > canvasWidth) break; // Stop if part exceeds the bar

		ctx.fillStyle = '#1f4068'; // Part color
		ctx.fillRect(x, 0, partWidth - 2, canvasHeight); // Subtract 2 for spacing

		// Draw the outline
		ctx.strokeRect(x, 0, partWidth - 2, canvasHeight);
	}

	// Draw leftover section
	const leftoverWidth = leftover * scaleFactor;
	ctx.fillStyle = '#ffd79a'; // Leftover color
	ctx.fillRect(canvasWidth - leftoverWidth, 0, leftoverWidth, canvasHeight);

	// Draw the outline for leftover
	ctx.strokeRect(canvasWidth - leftoverWidth, 0, leftoverWidth, canvasHeight);
}
	function calculate() {
	// Get input values
	const bar_length = parseFloat(document.getElementById("bar_length").value);
	const leftover = parseFloat(document.getElementById("leftover").value);
	const part_length = parseFloat(document.getElementById("part_length").value);
	const part_off = parseFloat(document.getElementById("part_off").value);
	const extra = parseFloat(document.getElementById("extra").value);
	const extra_s = parseFloat(document.getElementById("extra_s").value);
	const zero = parseFloat(document.getElementById("zero").value);
	const order_qty = parseFloat(document.getElementById("order_qty").value);
	const min = 4;
	const max = 14;

	// Calculate values
	const usable = bar_length - leftover; // Usable bar length
	const shift = part_length + part_off + extra + extra_s; // Total shift per part
	const parts_no_trunc = usable / shift; // Parts without truncation
	const parts = Math.trunc(parts_no_trunc); // Total parts (truncated)

	const remainder_frac = parts_no_trunc - parts; // Remainder fraction
	const remainder = remainder_frac * shift; // Actual remainder length

	// Flag if scaling is needed
	const fSL = remainder < 0.75;

	// Track best solution
	let best = {
		x: null,
		first_pull: Infinity,
		pull: -Infinity,
		z_offset: 0,
		last_pull: 0
	};

	for (let x = 3; x <= 25; x++) {
		let first_pull = parts % x;
		let pull = shift * x;
		let z_offset = shift * x + zero;
		let last_pull = 0;

		if (fSL) {
			first_pull -= 1;
			last_pull = zero + shift;
		}

		if (first_pull >= 0 && min < pull && pull <= max) {
			if (
				best.x === null ||
				first_pull < best.first_pull ||
				(first_pull === best.first_pull && pull > best.pull)
			) {
				best = { x, first_pull, pull, z_offset, last_pull };
			}
		}
	}

	const pulls = best.x ? Math.trunc(parts / best.x) : 0;
	const bars_needed = order_qty / parts;

	let outputHTML = `
		<h2>Results</h2>
		<table>
			<tr>
				<th>Label</th>
				<th>Value</th>
			</tr>
			<tr>
				<td>Bars needed:</td>
				<td>${bars_needed}</td>
			</tr>
			<tr>
				<td>Parts</td>
				<td>${parts}</td>
			</tr>
			<tr>
				<td>Parts per pull</td>
				<td>${best.x}</td>
			</tr>
			<tr>
				<td>First pull</td>
				<td>${best.first_pull}</td>
			</tr>
			<tr>
				<td>Pulls</td>
				<td>${pulls}</td>
			</tr>
			<tr>
				<td>Z-Offset</td>
				<td>${best.z_offset.toFixed(4)}</td>
			</tr>
	`;

	if (fSL) {
		//alert('Run 1 part at the end of the bar');
		outputHTML += `
			<tr>
				<td class="red">Scale One Part</td>
				<td class="red">Change offset to ${best.last_pull.toFixed(4)}</td>
			</tr>
			<tr>
				<td class="red">Set "Continue" to 0</td>
				<td class="red">Set "Continue" to 0</td>
			</tr>
		`;
	}

	outputHTML += `
			<tr>
				<td>Drop Length</td>
				<td>${(leftover + remainder).toFixed(4)}</td>
			</tr>
		</table>
		
	<div style="margin-top: 30px;">
	<h2>Visual Representation</h2>
	<canvas id="barCanvas" style="width: 100%; height: 50px; background-color: #1b1b2f; border: 1px solid #f5e6ca;"></canvas>
	</div>
	`;

	// Display output HTML
	document.getElementById("output").innerHTML = outputHTML;

	// Trigger slide-in animation for the results
	const outputDiv = document.getElementById("output");
	outputDiv.classList.add('show');

	// Call drawBar to update the canvas
	drawBar(parts, shift, bar_length, leftover);
}