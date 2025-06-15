<?php include VIEW . '/components/header.php'; ?>

<h2>Generator AJAX de Șiruri de caractere</h2>

<form id="generateForm">
  <label>Lungime:</label>
  <input type="number" name="length" value="10" min="1" required><br>

  <label>Opțiuni de caractere:</label>
  <div class="checkbox-group">
    <div class="checkbox-option">
      <span>Include litere mici</span>
      <input type="checkbox" name="lowercase" checked>
    </div>
    <div class="checkbox-option">
      <span>Include litere mari</span>
      <input type="checkbox" name="uppercase">
    </div>
    <div class="checkbox-option">
      <span>Include cifre</span>
      <input type="checkbox" name="digits">
    </div>
    <div class="checkbox-option">
      <span>Include simboluri (!@#$%...)</span>
      <input type="checkbox" name="symbols">
    </div>
  </div>

  <label>Prefix (opțional):</label>
  <input type="text" name="prefix"><br>

  <label>Sufix (opțional):</label>
  <input type="text" name="suffix"><br>

  <button type="submit">Generează</button>
</form>

<div id="resultBox" style="margin-top: 20px;">
  <h3>Rezultat:</h3>
  <div id="result" style="font-family: monospace;"></div>
</div>

<script src="/PIG/public/js/strings.js"></script>

<?php include VIEW . '/components/footer.php'; ?>
