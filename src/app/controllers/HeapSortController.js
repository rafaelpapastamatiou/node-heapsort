class HeapSortController {
  async index() {}
  async heapSort(v) {
    await constroiMaxHeap(v);
    let n = v.Length;
    for (let i = v.Length - 1; i > 0; i--) {
      await troca(v, i, 0);
      await refaz(v, 0, --n);
    }
  }
  async constroiMaxHeap(v) {
    for (let i = v.Length / 2 - 1; i >= 0; i--) refaz(v, i, v.Length);
  }
  async refaz(vetor, pos, tamanhoDoVetor) {
    let max = 2 * pos + 1,
      right = max + 1;
    if (max < tamanhoDoVetor) {
      if (right < tamanhoDoVetor && vetor[max] < vetor[right]) max = right;
      if (vetor[max] > vetor[pos]) {
        await troca(vetor, max, pos);
        await refaz(vetor, max, tamanhoDoVetor);
      }
    }
  }
  async troca(v, j, aposJ) {
    let aux = v[j];
    v[j] = v[aposJ];
    v[aposJ] = aux;
  }
}
module.exports = HeapSortController;
