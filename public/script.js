document.addEventListener('DOMContentLoaded', ()=>{
    async function handleRegister(e){
        e.preventDefault()

        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const ciudad = document.getElementById('ciudad').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try{
            const res = await fetch('http://localhost:5000/api/auth/register',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nombre, apellidos, ciudad, telefono, email, password})
            })

            const data = await res.json()
            if (res.status === 200){
                alert('Registro exitoso')
            }else {
                alert(`Error: ${data.msg}`)
            }
        } catch (error){
            console.error('Error:',error)
            alert ('Error de registro de usuario')
        }
    }

    async function handleLogin(e){
        e.preventDefault()

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try{
            const res = await fetch('http://localhost:5000/api/auth/login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password})
            })

            const data = await res.json()
            if (res.status === 200){
                alert('Login exitoso')
            }else {
                alert(`Error: ${data.msg}`)
            }
        } catch (error){
            console.error('Error:',error)
            alert ('Error de inicio de sesión')
        }
    }
    

    document.getElementById('registerForm').addEventListener('submit', handleRegister)
    document.getElementById('loginForm').addEventListener('submit', handleLogin)
})
