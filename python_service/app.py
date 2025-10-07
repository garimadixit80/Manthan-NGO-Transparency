from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route("/analyze", methods=["POST"])
def analyze():
data = request.json
donations = data.get("donations", [])
total = sum(d["amount"] for d in donations)
return jsonify({ "total_donations": total, "donation_count": len(donations) })


if __name__ == "__main__":
app.run(port=6000, debug=True)