export function Heapify(unsorted_array) {
    var length = unsorted_array.length - 1;
    for (let i = length; i > 0; i--) {
        const current = unsorted_array[i].distance;
        const parent = unsorted_array[Math.floor((i - 1)/2)].distance;
        // swap with parent if current > parent
        if (current < parent) {
            //alert("1");
            var temp = unsorted_array[i];
            unsorted_array[i] = unsorted_array[Math.floor((i - 1) / 2)];
            unsorted_array[Math.floor((i - 1) / 2)] = temp; 
            //swap(unsorted_array[i],unsorted_array[(i - 1) / 2]);
        }
    }
}

export function FixDown(heap) {
    const last_level = Math.floor((heap.length - 1) / 2);
    for (let i = 0; i < last_level; i++) {
        // swap with smallest child, fix_down
        const current = heap[i].distance;
        const left_child = heap[i * 2 + 1].distance;
        const right_child = heap[i * 2 + 2].distance;
        var smaller = Math.min(left_child, right_child);
        if (smaller < current) {
            if (left_child == smaller) {
                var temp = heap[i];
                heap[i] = heap[i * 2 + 1];
                heap[i * 2 + 1] = temp;
            }
            else {
                var temp = heap[i];
                heap[i] = heap[i * 2 + 2];
                heap[i * 2 + 2] = temp;
            }
        }
    }
}
    // remove and return the smallest element in heap
export function DeleteMin(heap) {
    var length = heap.length - 1;
    const min = heap[0];
    heap[0] = heap[length];
    heap[length] = min;
        //alert(heap[0].row);
    heap.pop();
    length = length - 1;
    const last_level = Math.floor((heap.length - 1) / 2);
    for (let i = 0; i < last_level; i++) {
        // swap with smallest child, fix_down
        const current = heap[i].distance;
        const left_child = heap[i * 2 + 1].distance;
        const right_child = heap[i * 2 + 2].distance;
        var smaller = Math.min(left_child, right_child);
        if (smaller < current) {
            if (left_child == smaller) {
                var temp = heap[i];
                heap[i] = heap[i * 2 + 1];
                heap[i * 2 + 1] = temp;
            }
            else {
                var temp = heap[i];
                heap[i] = heap[i * 2 + 2];
                heap[i * 2 + 2] = temp;
            }
        }
    }
    return min;
     //alert(min.distance);
}