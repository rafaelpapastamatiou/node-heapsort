const socket = require("socket.io")(80);
const nunjucks = require("nunjucks");
let maxHeapArray = [];
let maxHeapJson = [];
let heapJson = [];
let stringMaxHeapJson;
let stringHeapJson = [];
let pause = false;
let array_length;
const Treant = require("treant-js");
let vetor = Array(15)
  .fill()
  .map(() => Math.round(Math.random() * 499));
class HeapSortController {
  async index(req, res) {
    //console.log(vetor);

    await this.heapSort(vetor, res);
    res.render("heapsort", {
      maxTree: JSON.stringify(stringMaxHeapJson[0]),
      heapTrees: JSON.stringify(stringHeapJson)
    });
    //console.log(vetor);
  }
  async heap_root(input, i, index = null) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
    if (left < array_length && input[left] > input[max]) {
      max = left;
    }
    if (right < array_length && input[right] > input[max]) {
      max = right;
    }
    if (index) {
      this.gerarJson(input, index);
      stringHeapJson.push({ json: maxHeapJson });
    }
    if (max != i) {
      this.swap(input, i, max);
      this.heap_root(input, max, index ? index : null);
    }
  }
  swap(input, index_A, index_B) {
    var temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
  }
  async heapSort(input, res) {
    stringHeapJson = [];
    maxHeapArray = [];
    maxHeapJson = [];
    stringHeapJson = [];
    array_length = input.length;
    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
      if (!pause) {
        this.heap_root(input, i);
      } else {
        i++;
      }
    }
    this.gerarJson(input);
    stringMaxHeapJson = maxHeapJson;
    stringHeapJson.push({ json: maxHeapJson });
    stringMaxHeapJson = maxHeapJson;
    //console.log(JSON.stringify(stringMaxHeapJson));
    //console.log(JSON.stringify(stringMaxHeapJson[0]));
    for (i = input.length - 1; i > 0; i--) {
      if (!pause) {
        this.swap(input, 0, i);
        array_length--;
        this.gerarJson(input, i);
        stringHeapJson.push({ json: maxHeapJson });
        //console.log(maxHeapArray);
        this.heap_root(input, 0, i);
        this.gerarJson(input, i);
        stringHeapJson.push({ json: maxHeapJson });
        //console.log(maxHeapArray);
      } else {
        i++;
      }
    }
    //console.log(JSON.stringify(stringMaxHeapJson, null, " "));
    //console.log(JSON.stringify(stringHeapJson, null, " "));
  }
  gerarJson(input, limite = null) {
    maxHeapArray = [];
    maxHeapJson = [];
    let l;
    if (limite) l = limite;
    else l = input.length;
    for (let i = 0; i < l; i++) {
      if (i == 0) {
        maxHeapArray.push({
          root: true,
          val: input[i],
          parent: null,
          id: i
        });
      } else {
        maxHeapArray.push({
          root: false,
          val: input[i],
          parent: Math.round(i / 2) - 1,
          id: i
        });
      }
    }
    let p;
    maxHeapArray.forEach(element => {
      if (element.root) {
        maxHeapJson[0] = {};
        maxHeapJson[0].text = { name: element.val };
        maxHeapJson[0].children = [];
        maxHeapJson[0].root = true;
        maxHeapJson[0].id = element.id;
      } else {
        p = this.findObjectById(maxHeapJson[0], element.parent);
        if (!p.children) p.children = [];
        p.children.push({
          text: { name: element.val },
          children: [],
          root: false,
          id: element.id
        });
      }
    });
  }
  findObjectById(r, id) {
    if (r.id == id) return r;
    if (r && r.children && r.children.length > 0) {
      if (r.children[0].id == id) {
        return r.children[0];
      } else if (r.children[1].id == id) {
        return r.children[1];
      } else {
        for (var c in r.children) {
          let retorno = this.findObjectById(r.children[c], id);
          if (retorno) return retorno;
        }
      }
    }
  }
  renderNjk(json, res) {
    res.render("heapsort", { tree: json }, function(err, html) {
      if (err) {
        console.log(err);
        res.status(500).send();
      }
      return html;
    });
  }
}
module.exports = new HeapSortController();
