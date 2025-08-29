import { Router } from "express";
import { getDados, addDados, editDados, delDados } from "../dados/storage.js";

const rota = Router();


rota.get('/get', getDados);
rota.post('/add', addDados);
rota.patch('/edit:matricula', editDados)
rota.delete('/del:matricula', delDados)

export default rota;