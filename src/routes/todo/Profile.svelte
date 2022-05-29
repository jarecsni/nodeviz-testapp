<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>


<h3>Hi { displayName }!</h3>

<img src={ photoURL } width="100" alt="user avatar" referrerpolicy="no-referrer">
<p>Your userID is { uid }</p>