<script lang="ts">
  import Ps1 from "./components/Ps1.svelte";
  import Input from "./components/Input.svelte";
  import History from "./components/History.svelte";
  import { theme } from "./stores/theme";

  function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "none";
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  }
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
    // form submission
    async function handleSubmit(event) {
      event.preventDefault();

      const form = document.querySelector(".apply-form");
      const btc = form.querySelector("#form-btc").value;

      const res = await fetch(
        `https://odoo.logos.co/website_mass_mailing/subscribe2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: {
              value: btc,
              name: name || "",
              list_id: 16,
              subscription_type: "email",
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

    // Fathom tracking
    (function (f, a, t, h, o, m) {
      a[h] =
        a[h] ||
        function () {
          (a[h].q = a[h].q || []).push(arguments);
        };
      (o = f.createElement("script")),
        (m = f.getElementsByTagName("script")[0]);
      o.async = 1;
      o.src = t;
      o.id = "fathom-script";
      m.parentNode.insertBefore(o, m);
    })(document, window, "//fathom.bi.status.im/tracker.js", "fathom");
    fathom("set", "siteId", "VEJFY");
    fathom("trackPageview");
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

  <div id="modal" class="modal" on:click={handleClickOutside}>
    <div class="modal-content">
      <div class="close-button" on:click={closeModal}>×</div>
      <img src="/operator.gif" alt="Operator" width="100%" />
    </div>
  </div>
</main>
