<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { history } from "../stores/history";
  import { theme } from "../stores/theme";
  import { ascii, banner, commands } from "../utils/commands";
  import { track } from "../utils/tracking";

  let command = "";
  let historyIndex = -1;

  let input: HTMLInputElement;

  onMount(() => {
    $history = [];
    input.focus();

    document.documentElement.style.setProperty(
      "--text-color",
      `${$theme.foreground}`
    );

    document.documentElement.style.setProperty("--green", `${$theme.green}`);

    if ($history.length === 0) {
      const command = commands["banner"] as () => string;

      if (command) {
        const output = command();

        // $history = [...$history, { command: "banner", outputs: [output] }];
        $history = [];
      }
    }

    if ($history?.length > 0) {
      let organnizedHistory: any = [];

      $history.forEach((item) => {
        if (item.command !== "") {
          organnizedHistory.push(item);
        }
      });

      const content = ascii + banner;

      if ($history[0]?.command !== "banner") {
        organnizedHistory = [
          { command: "banner", outputs: [content] },
          ...organnizedHistory,
        ];
      }

      // $history = organnizedHistory;
      $history = [];
    }
  });

  afterUpdate(() => {
    input.scrollIntoView({ behavior: "smooth", block: "end" });
  });

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const [commandName, ...args] = command.split(" ");
      const lowerCaseCommandName = commandName.toLowerCase();

      if (import.meta.env.VITE_TRACKING_ENABLED === "true") {
        track(lowerCaseCommandName, ...args);
      }

      const commandFunction = commands[lowerCaseCommandName];

      if (commandFunction) {
        const output = await commandFunction(args);

        if (lowerCaseCommandName !== "clear") {
          $history = [...$history, { command, outputs: [output] }];
        }
      } else {
        const output = `${lowerCaseCommandName}: command not found`;

        $history = [...$history, { command, outputs: [output] }];
      }

      command = "";
    } else if (event.key === "ArrowUp") {
      if (historyIndex < $history.length - 1) {
        historyIndex++;

        command = $history[$history.length - 1 - historyIndex].command;
      }

      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      if (historyIndex > -1) {
        historyIndex--;
        command =
          historyIndex >= 0
            ? $history[$history.length - 1 - historyIndex].command
            : "";
      }
      event.preventDefault();
    } else if (event.key === "Tab") {
      event.preventDefault();

      const autoCompleteCommand = Object.keys(commands).find((cmd) =>
        cmd.startsWith(command)
      );

      if (autoCompleteCommand) {
        command = autoCompleteCommand;
      }
    } else if (event.ctrlKey && event.key === "l") {
      event.preventDefault();

      $history = [];
    }
  };
</script>

<svelte:window
  on:click={() => {
    const form = document.querySelector(".apply-form");

    if (!form) {
      input.focus();
    }
  }}
/>

<div class="flex w-full">
  <p class="visible md:hidden">❯</p>

  <input
    id="command-input"
    name="command-input"
    aria-label="Command input"
    class="w-full px-2 bg-transparent outline-none"
    type="text"
    style={`color: ${$theme.foreground}`}
    bind:value={command}
    on:keydown={handleKeyDown}
    bind:this={input}
  />
</div>
