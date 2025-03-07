import pandas as pd
import folium
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Step 1: Load Crime Dataset
try:
    df = pd.read_csv("Crime_data.csv")  # Replace with your dataset file path
except FileNotFoundError:
    print("Error: The file 'Crime_data.csv' was not found. Please ensure it is in the correct directory.")
    exit()

# Step 2: Inspect Dataset Columns
print("Dataset Columns:", df.columns)
print(df.head())

# Verify required columns exist
required_columns = ["LOCATION", "LAT", "LON", "TIME OCC"]
for col in required_columns:
    if col not in df.columns:
        print(f"Error: Required column '{col}' is missing from the dataset.")
        exit()

# Step 3: Data Cleaning
df = df.dropna()  # Remove missing values

# Convert time to hour (if applicable)
if 'TIME OCC' in df.columns:
    df['hour'] = pd.to_datetime(df['TIME OCC'], format="%H%M", errors='coerce').dt.hour

# Step 4: Assign Risk Scores to Locations
crime_counts = df["LOCATION"].value_counts()
risk_scores = {loc: (count / crime_counts.max()) * 100 for loc, count in crime_counts.items()}

# Step 5: Generate High-Risk Areas Map (if latitude & longitude exist)
if 'LAT' in df.columns and 'LON' in df.columns:
    crime_map = folium.Map(location=[34.0522, -118.2437], zoom_start=12)  # Adjust center coordinates (Los Angeles)

    for loc, score in risk_scores.items():
        if score > 50:  # Show only high-risk areas
            row = df[df["LOCATION"] == loc].iloc[0]
            folium.Marker([row["LAT"], row["LON"]],
                          popup=f"{loc} - {score:.2f}% risk",
                          icon=folium.Icon(color="red")).add_to(crime_map)

    # Save map as HTML file
    crime_map.save("crime_map.html")
    print("Crime map saved as crime_map.html")

# Step 6: Train Machine Learning Model for Predictions
df["risk_label"] = df["LOCATION"].map(lambda x: 1 if risk_scores[x] > 50 else 0)
X = df[["hour"]]
y = df["risk_label"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier()
model.fit(X_train, y_train)

print("Model training completed.")
