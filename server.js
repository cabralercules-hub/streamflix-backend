kkkkconst express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor StreamFlix Online");
});

app.post("/criar-pagamento", async (req, res) => {
    const { email, plano } = req.body;

    const valores = {
        mensal: 5000,
        anual: 50000
    };

    try {
        const resposta = await axios.post(
            "https://api.flutterwave.com/v3/payments",
            {
                tx_ref: Date.now(),
                amount: valores[plano],
                currency: "AOA",
                redirect_url: "https://google.com",
                customer: { email },
                customizations: {
                    title: "StreamFlix",
                    description: `Plano ${plano}`
                }
            },
            {
                headers: {
                    Authorization: `Bearer SUA_SECRET_KEY_AQUI`
                }
            }
        );

        res.json(resposta.data);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar pagamento" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor ligado"));

const fs = require("fs");

function getUsers() {
  return JSON.parse(fs.readFileSync("users.json"));
}

function saveUsers(data) {
  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
        }
