// window.onload = function () {
//     xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("POST", 'http://localhost/haha', true);
//     xmlhttp.send(`asd`);
// }
import axios from 'axios'
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', function () {
    axios.post('http://localhost/haha', 'a=1&b=1')
  })
}
