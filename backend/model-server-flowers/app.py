import os
import numpy as np
from keras.models import load_model
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from tensorflow.keras.utils import load_img, img_to_array
import tensorflow as tf
from flask_cors import CORS

try:
    import shutil
    shutil.rmtree('uploads')
    os.mkdir('uploads')
except:
    pass

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'models/model_flowers_acc79_valacc73.h5'

model = load_model(MODEL_PATH)

def model_predict(img_path, model):
    img = load_img(img_path, target_size=(180, 180))
    x = img_to_array(img)
    x = np.expand_dims(x, axis=0)
    preds = model.predict(x)
    return preds

@app.route('/predict-flowers', methods=['POST'])
def index():
    try:
        print(request.files, flush=True)
        f = request.files['file']

        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        preds = model_predict(file_path, model)
        score = tf.nn.softmax(preds[0])

        labels = ['sedmokráska', 'púpava', 'ruža', 'slnečnica', 'tulipán']

        pred_dict = {
            "label": labels[np.argmax(score)],
            "percentage": "{:.2f}".format(100 * np.max(score))
        }
        
        print(pred_dict, flush=True)
        response = jsonify(predictions=pred_dict)
        response.status_code = 200

        return response
    
    except Exception as e:
        print(e, flush=True)
        response.status_code = 400

        return response


if __name__ == '__main__':
    app.run(debug=True)
