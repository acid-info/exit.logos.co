<script>
  import { theme } from "../stores/theme";
  let hostname = window.location.hostname;
</script>

<h1 class="flex font-bold">
  <span style={`color: ${$theme.yellow};`}>guest</span>
  <span style={`color: ${$theme.white}`}>@</span>
  <span style={`color: ${$theme.white}; width: max-content;`}
    >exit.logos.co</span
  >
  <span style={`color: ${$theme.white}`}>:~$</span>
</h1>
