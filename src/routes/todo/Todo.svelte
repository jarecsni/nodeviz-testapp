<section>
	{#if user}
		<Profile {...user} />
		<button on:click={() => auth.signOut()}>Logout</button>
	{:else}
		<button on:click={login}> Signin with Google </button>
	{/if}
</section>

<GenericComponentContainer {node} />


<script lang="ts">
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import GenericComponentContainer from '../../nodeviz/GenericComponentContainer.svelte';
	import { TodoHome } from '../../nodeviz/widgets/todo/TodoHome';
	import { Node } from '$lib/nodeviz/Node';

	import Profile from './Profile.svelte';

	import { auth, googleAuthProvider } from '../firebase';
	import { authState } from 'rxfire/auth';

	let user;

	const unsubscribe = authState(auth).subscribe((u) => (user = u));

	function login() {
		signInWithPopup(auth, googleAuthProvider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}

	const node = new Node('Todo', new TodoHome());
</script>
