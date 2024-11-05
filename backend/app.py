from flask import Flask, request, jsonify
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    file = request.files['file']
    date_column = request.form['date_column']
    qty_column = request.form['qty_column']
    periods = int(request.form['periods'])

    df = pd.read_csv(file)
    df[date_column] = pd.to_datetime(df[date_column])
    df = df.set_index(date_column)

    # Prepare data for model
    X = np.arange(len(df)).reshape(-1, 1)
    y = df[qty_column].values

    # Train model
    model = LinearRegression()
    model.fit(X, y)

    # Generate forecast
    future_X = np.arange(len(df), len(df) + periods).reshape(-1, 1)
    forecast = model.predict(future_X)
    
    # Create a response
    forecast_dates = pd.date_range(start=df.index[-1], periods=periods + 1, closed='right')
    forecast_data = pd.DataFrame({'ds': forecast_dates, 'forecast': forecast})
    forecast_data['lower'] = forecast_data['forecast'] * 0.9  # Example confidence interval
    forecast_data['upper'] = forecast_data['forecast'] * 1.1

    return forecast_data.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)
