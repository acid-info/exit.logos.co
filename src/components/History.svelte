<script lang="ts">
  import { history } from "../stores/history";
  import { theme } from "../stores/theme";
  import Ps1 from "./Ps1.svelte";

  function parseTemplateString(templateString: string) {
    const htmlContent = templateString.replace('<template>', '').replace('</template>', '');
    return htmlContent;
  }
</script>

<p class="banner"></p>

{#each $history as { command, outputs }}
  <div style={`color: ${$theme.foreground}`}>
    <div class="flex-col md:flex-row">
      <Ps1 />

      <div class="flex">
        <p class="visible md:hidden">❯</p>
        <p class="px-2">{command}</p>
      </div>
    </div>

    {#each outputs as output}
      {#if output.startsWith("<template>")}
        {@html parseTemplateString(output)}
      {:else}
        <p class="whitespace-pre">{output}</p>
      {/if}
    {/each}
  </div>
{/each}
