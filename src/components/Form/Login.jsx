import React, { useState } from 'react';
import axios from 'axios';
import {
FormControl,
FormLabel,
Input,
Button,
Checkbox,
CheckboxGroup,
VStack,
} from '@chakra-ui/react';

function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await axios.post(
'https://starfish-app-3xk6j.ondigitalocean.app/authenticate',
{
email,
password,
}
);
console.log(response.data);
alert('Vous êtes connecté!');
window.location.href = '/'; // Rediriger l'utilisateur vers la page d'accueil
} catch (error) {
console.error(error);
alert('Erreur lors de la connexion. Veuillez réessayer.');
}
};

return (
<section className="form-section">
<div className="form-box">
<div className="form-value">
<form onSubmit={handleSubmit}>
<VStack spacing="20px">
<FormControl id="email">
<FormLabel>Email</FormLabel>
<Input
placeholder="email"
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</FormControl>
<FormControl id="password">
<FormLabel>Mot de passe</FormLabel>
<Input
placeholder="password"
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</FormControl>
<CheckboxGroup colorScheme="green">
<Checkbox>Se souvenir de moi</Checkbox>
</CheckboxGroup>
<Button type="submit">Se connecter</Button>
</VStack>
</form>
</div>
</div>
</section>
);
}

export default Login;
