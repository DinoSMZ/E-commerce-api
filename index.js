const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 4000;
const {v4: uuid} = require("uuid")


const usuarios = [
    {
        id: 1,
        nombre: "Dino",
        apellido: "Sanchez",
        username:"DinoSM",
    },
    {
        id: 2,
        nombre: "Vane",
        apellido: "Salomon",
        username:"VaneSA",

    }
];

app.use(express.json());

app.get("/", (req, res) =>{
    return res.json({
        msg: "Lista de usuarios obtenidas",
        data: usuarios,
    })
})

app.post("/", (req, res) => {

    const {nombre, apellido, username} = req.body
    
    const usuario= {
        id:uuid(),
        nombre,
        apellido,
        username,
    };

    usuarios.push(usuario);

    return res.json({
        msg: "usuario creado",
        data: usuario,
    });
});


// en la ruta se incluye el id, "params"
app.put("/:id", (req, res) => {

    const {id} = req.params;

    const {nombre, apellido, username} = req.body;

    const usuarioEncontrado = usuarios.find((usuario) =>{
        return usuario.id === id;
    });

    usuarioEncontrado.nombre = nombre
    usuarioEncontrado.apellido = apellido
    usuarioEncontrado.username = username

    return res.json({
        msg: "Usuario actualizado",
        data: usuarioEncontrado,
    });
});


app.delete("/:id", (req, res) => {

    const {id} = req.params;

    const usuarioEncontrado = usuarios.find((usuario) =>{
        return usuario.id === id;
     });

     usuarios.splice(usuarios.indexOf(usuarioEncontrado),1);

    return res.json({
        msg: "Usuario eliminado",
        data: usuarioEncontrado,
    });
});


app.listen("4000", () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});