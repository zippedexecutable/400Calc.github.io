async function fetchCsv() {
  const csvUrl = "https://your-s3-bucket-url/data.csv"; // Replace with your S3 bucket URL

  try {
    const response = await fetch(csvUrl);
    if (response.ok) {
      const csvText = await response.text();
      console.log(csvText);
      // Process and display the CSV content as needed
    } else {
      console.error("Failed to fetch CSV");
    }
  } catch (error) {
    console.error("Error fetching CSV:", error);
  }
}