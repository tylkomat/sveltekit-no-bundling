<script lang="ts">
  import type { PageData, ActionData } from './$types';

  export let form: ActionData;
  export let data: PageData;
</script>

<h2>Leave empty for error, fill for success</h2>

<form method="POST">
  <input type="text" placeholder="fill something" name="something">
  <input type="submit" value="Submit">
</form>

<pre>Errors: {JSON.stringify(form?.errors, null, 2)}</pre>
<pre>Success: {JSON.stringify(form?.success, null, 2)}</pre>
