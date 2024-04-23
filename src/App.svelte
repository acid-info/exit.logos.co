<script lang="ts">
  import Ps1 from "./components/Ps1.svelte";
  import Input from "./components/Input.svelte";
  import History from "./components/History.svelte";
  import { theme } from "./stores/theme";
</script>

<svelte:head>
  {#if import.meta.env.VITE_TRACKING_ENABLED === "true"}
    <script
      async
      defer
      data-website-id={import.meta.env.VITE_TRACKING_SITE_ID}
      src={import.meta.env.VITE_TRACKING_URL}
    ></script>
  {/if}
  <script>
    async function handleSubmit(event) {
      event.preventDefault();

      const form = document.querySelector(".apply-form");
      const name = form.querySelector("#form-name").value;
      const email = form.querySelector("#form-email").value;

      const x = form.querySelector("#form-x").value;
      const reason = form.querySelector("#form-reason").value;
      const contribution = form.querySelector("#form-contribution").value;

      const res = await fetch(
        `https://odoo.logos.co/website_mass_mailing/subscribe3`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: {
              value: email,
              name: name || "",
              list_id: 12,
              subscription_type: "email",
              social: x || "",
              reason: reason || "",
              contribution: contribution || "",
            },
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        alert("There was an error submitting your application.");
      } else {
        console.log(data);
        alert("Thank you for applying!");
      }
    }
  </script>
</svelte:head>

<main
  class="h-full p-8 overflow-auto text-xs border-2 rounded-md sm:text-sm md:text-base"
  style={`background-color: ${$theme.background}; color: ${$theme.foreground}; border-color: transparent;`}
>
  <History />

  <div id="input" class="flex flex-col md:flex-row">
    <Ps1 />

    <Input />
  </div>
</main>
