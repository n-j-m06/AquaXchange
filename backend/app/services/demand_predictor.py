import numpy as np

from sklearn.ensemble import RandomForestRegressor


def train_demand_model():

    # Historical sample data
    #
    # Features:
    # temperature, rainfall, month

    X = np.array([
        [25, 120, 1],
        [27, 100, 2],
        [29, 80, 3],
        [31, 60, 4],
        [33, 40, 5],
        [34, 30, 6],
        [32, 50, 7],
        [30, 70, 8],
        [29, 90, 9],
        [27, 110, 10],
        [25, 130, 11],
        [24, 140, 12]
    ])

    # Historical water demand in litres

    y = np.array([
        80000,
        85000,
        95000,
        110000,
        125000,
        130000,
        120000,
        110000,
        100000,
        90000,
        82000,
        78000
    ])

    # Create ML model

    model = RandomForestRegressor(
        n_estimators=100,
        random_state=42
    )

    # Train model

    model.fit(X, y)

    return model


def predict_demand(
    temperature,
    rainfall,
    month
):

    # Train model

    model = train_demand_model()

    # Prepare input

    input_data = np.array([
        [temperature, rainfall, month]
    ])

    # Predict demand

    prediction = model.predict(input_data)[0]

    return round(float(prediction), 2)