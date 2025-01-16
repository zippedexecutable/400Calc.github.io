async function fetchCsv() {
  const csvUrl = "https://400-csv-storage.s3.us-east-2.amazonaws.com/data.csv"; // Replace with your S3 bucket URL

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