document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#generateGraphForm");
  const resultDiv = document.querySelector("#graphResult");
  const svg = document.querySelector("#graphSvg");
  const graphMessage = document.querySelector("#graphMessage");

  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    // Include checkboxes manually to ensure they are sent
    ["conex", "bipartit", "arbore"].forEach(name => {
      const checkbox = form.querySelector(`input[name="${name}"]`);
      if (checkbox && checkbox.checked) {
        formData.set(name, "1");
      } else {
        formData.delete(name); // important: eliminăm dacă nu e bifat
      }
    });

    // Diagnostic logging
    for (let [key, value] of formData.entries()) {
      console.log("formData:", key, value);
    }

    const numNodes = parseInt(formData.get("nodes"));
    const type = formData.get("type");

    fetch("/PIG/public/ajax/generate_graph", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const edges = data.edges;
        if (!edges || !Array.isArray(edges)) {
          resultDiv.textContent = "Eroare: răspuns invalid (edges lipsă sau invalid).";
          return;
        }

        const muchii = edges.map(e => e.join(" ")).join("\n");
        const matrice = data.adjacencyMatrix.map(row => row.join(" ")).join("\n");
        const vectorTati = data.parentVector.join(" ");

        resultDiv.textContent =
          "Este:" +
          "\nConex: " + (data.isConnected ? "Da" : "Nu") +
          "\nBipartit: " + (data.isBipartite ? "Da" : "Nu") +
          "\nArbore: " + (data.isTree ? "Da" : "Nu") +
          "\n\nMuchii:\n" + muchii +
          "\n\nMatrice de adiacență:\n" + matrice +
          "\n\nVectori de tați:\n" + vectorTati;

        // Logica pentru reprezentarea grafică
        if (numNodes <= 10) {
          // Ascunde mesajul și afișează SVG-ul
          graphMessage.style.display = "none";
          svg.style.display = "block";
          drawGraph(edges, numNodes, type);
        } else {
          // Afișează mesajul și ascunde SVG-ul
          graphMessage.style.display = "block";
          svg.style.display = "none";
          svg.innerHTML = ""; // Curăță SVG-ul
        }
      })
      .catch((err) => {
        resultDiv.textContent = "Eroare: " + err;
        // În caz de eroare, ascunde atât mesajul cât și SVG-ul
        graphMessage.style.display = "none";
        svg.style.display = "none";
      });
  });

  function drawGraph(edges, numNodes, type) {
    svg.innerHTML = `
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7"
                refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
    `;

    const width = parseInt(svg.getAttribute("width"));
    const height = parseInt(svg.getAttribute("height"));
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 50;

    const coords = [];

    for (let i = 0; i < numNodes; i++) {
      const angle = (2 * Math.PI * i) / numNodes;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      coords.push({ x, y });

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", 15);
      circle.setAttribute("fill", "#df7d90");
      svg.appendChild(circle);

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", x);
      label.setAttribute("y", y + 5);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-size", "12px");
      label.setAttribute("fill", "#fff");
      label.textContent = i;
      svg.appendChild(label);
    }

    for (const edge of edges) {
      const [from, to, weight] = edge;
      const x1 = coords[from].x;
      const y1 = coords[from].y;
      const x2 = coords[to].x;
      const y2 = coords[to].y;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", "#555");
      line.setAttribute("stroke-width", "2");

      if (type === "directed") {
        line.setAttribute("marker-end", "url(#arrowhead)");
      }

      svg.appendChild(line);

      if (type === "weighted" && typeof weight !== "undefined") {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", midX + 5);
        text.setAttribute("y", midY - 5);
        text.setAttribute("fill", "#000");
        text.setAttribute("font-size", "12px");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("text-anchor", "middle");
        text.textContent = weight;

        svg.appendChild(text);
      }
    }
  }
});