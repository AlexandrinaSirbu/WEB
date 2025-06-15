<?php include VIEW . '/components/header.php'; ?>
<h2>Generator AJAX de Grafuri</h2>
<form id="generateGraphForm">
  <label>Număr de noduri:</label>
  <input type="number" name="nodes" value="5" min="2" required><br>
  
  <label>Număr de muchii:</label>
  <input type="number" name="edges" value="6" min="1" required><br>
  
  <label>Tip graf:</label>
  <select name="type">
    <option value="undirected">Neorientat</option>
    <option value="directed">Orientat</option>
    <option value="weighted">Ponderat</option>
  </select><br>
  
  <label>Proprietăți graf:</label>
  <div class="checkbox-group">
    <div class="checkbox-option">
      <span>Conex</span>
      <input type="checkbox" name="conex" value="1">
    </div>
    <div class="checkbox-option">
      <span>Bipartit</span>
      <input type="checkbox" name="bipartit" value="1">
    </div>
    <div class="checkbox-option">
      <span>Arbore</span>
      <input type="checkbox" name="arbore" value="1">
    </div>
  </div>
  
  <button type="submit">Generează</button>
</form>

<div id="resultBox" style="margin-top: 20px;">
  <h3>Rezultat:</h3>
  <pre id="graphResult" style="font-family: monospace;"></pre>
</div>

<div id="graphSvgBox" style="margin-top: 20px;">
  <h3>Reprezentare grafică:</h3>
  <div id="graphMessage" style="display: none; padding: 10px; background-color: #f0f0f0; border-radius: 5px; margin-bottom: 10px; color: #666;">
    Reprezentarea grafică nu este afișată pentru grafurile cu mai mult de 10 noduri.
  </div>
  <svg id="graphSvg" width="500" height="500"></svg>
</div>

<script src="/PIG/public/js/graphs.js"></script>
<?php include VIEW . '/components/footer.php'; ?>