// ==UserScript==
// @name         Return Scrollable
// @namespace    https://github.com/cilxe/JavaScriptProjects
// @version      0.2.1
// @description  Enable scroll functionality after blocking pop-ups on certain sites.
// @author       zakashic
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAQK0lEQVR42u3dbWhcZ3rGcesoMx6fOZJivUw0J7YctXLtSlVt1S8dTzHFEVkXI2+d9TpZ29pkQ5r1Vt5MpG7VbJINiylaB2MopVBKMRyWgqlESlmWdOuWTemymML2bWkrb9X0JevW+LOk73f/j3JN9vEwM9J6bBg5c+AHk3Pu+3qe+xx5RjG2vGVL62gdraN1tI7W0TpaR+vYTMf/WRsCaWvdkId3o90NfgxpZBAiK5GU/ztUTVo9QesG3v9NT2GbbnAntqMXOfQjj1jyOpdTzXb1RMpItR7Gxm58u76C3Y3r0s10N3cXdmME+3EQBRSloHP7VbNbPXlldCkzs7ZG66j6Fe9uTge6deMGdTMPYxyn8AKmMIvLSOSyzk2p5pR6DitjUJndWiPT+hXxkw/Srfrq7NbbifvqPYBncF43dh6LuAtbx13Vzqv3vLIOKDvWWpHWbvskv92Eentw799DOIQJfSW7G3hnAzd8PXeUNaXsQ1qrX2uHn7y3pY8+FN1XYA8GsA/HdZNuYOUB3PhKK8qe0lr7tHaP9pL6pNz8tN6Hc/pKLOpt4to6N34BMziDHVVyd+jajGrrPYhrWrOoPeS0p/Qjfe/b/tfS6EQ/9mIcJdyCVXFz7abWOILbFjh1HvYZl1Ej+5bWHtde+rW3R/MhtH9o6fYfWyfyGMEJzGEZVmEh+HGVr/KPctqUFSIr4dq5D6t/oLosl1llnWXt4YT2lF/b44eP2ENI/bel0IF+jGACV7EK89x+7H/sSM2c/7KAmhBd6ENe+nQudDW1+l22W6NizVXtZUJ769deH43PhK0fWPvW/7QIOezFCVzFKsyzsIGcLLoxgFEUZFTnutdqPqj/XY1bq2LtVe3phPaYW9vzB5v8u6NtS9aW+Q8L0YMhjGMOqzDPzDo5KWoi9GIQRzCprDm9PqJrriZyPfUy3ZoVe1hV1rj26vYcuhk27QMIf2Rb0YUBFFHCMuxj/177Q9Yd2R9ZmroO9GEIR3EBi17Oos4dVY2r7XC9dffH2vfs5aO9lbTXAe1966a8+R3/ZkG0aBH6sQ/ncQvmmanT38b1rejEE9iDpzGNpYoc07lp1exRj+vd6rJqreP2UJFzS3vdp71HbpZN9wA6/9Uy6MYQjuMazFPzPb/rX6xN/V3IY1gZl7BckeNbVs1x9eSVkXGZdfa6UJFzTRlDmiGzqW7+4z+0dnQgxiFMYQUmt2v1bv+hBVzfhsfxJEZxElcqMmpZUe1J9T6prG0uu86eb1dkTGnvsWbZPB/I3f9kGXRjNyZwA/axf67+rWb3P1rA9RDbsRNjOI3rWL0no75V9ZxWxk5lhm6Nqmuzp4qMG9r7bs2yOX4V9P69Bb3/YBHyOIAprMBkoUZfG9dCdGMXDuEs3vV6K727getnlbVL2aFbq+oe2JvXu6K9H9AskZut6R9A7geWQhcG8QzmYWV9P6j+f7hcS6tvAAV8Ae/7vZ5VXMdpua5z1WrfV1ZB2W6Nqt8dub1V9M5rhkH1Nf//nD3xd7YNvRjBedyByc06fSH6MIpJLHp9vhVcwUnVjur1FV2r1rOozFGtEdbZx02v745mGNFM25r65sc3LcjftAh5HMYszHOmTl9WfQXMVfSVLeMSjmNY9Xm9Pq5ryzV655Tt6rNuzWp7cXus6JvVLK4vqtXXFMeO79tjT37fOrEL45iHldXq41qALPIoYM7vkyVM42nswRNaq1Ov9+jatGor++eUnddaQZ39+H3zmsXN1OlmbNoHsPNvLY3t2I1TWITJwjq9IfowismKXvf6Ao5iSHUdO7/Het9bW7ND54ZUc6FK/6SyXV24zl4WKnpPaSY3W/P+Tumuv7EMejGCF3AXJjPr9KbRhQEUMIk5ca+PYFD5EVJeb0rnelVzpEp/QdlujfQ6e5nx9n1Xs4wov3m/HR38roXIYT+mYJ66v+fz1HetTf3dGMAoCjKqc+5altr2Kv3t7toG+kO31jpznKnY+5RmcrOFTfsAfvavLIt+HMQsrOxn/rr6t5/+QU1AbYgu9CEvfToXupqH1e/l7PD3rlkOarZsU9783d+xtt1/aVnkUcBlWNlGc4ZuWBvS9ITKc0J3zl172P0fz+PtXbMUNFvWzdp0D2DPX1iACDGKSGBl95P5c9+xwLlnnfdY5z1LkZlBKJm1c+/dW1ut/6eYxzyJZoo1Y/N9K7r32xYgQowiEljZg1jj579tKbKy6EIPctKjc1lX84DmMU+imWLN2HwPYPhbFiBCjCISWFmj+SPfsjQ5ncjhKQxjvwzrnLvW6WofwDzmSTRTrBmb7wH8wp9bgAgxikhgZQ1mp9CJPIZxDOdwUc7p3LBqXG2qwTXNk2imWDM23wP4xT+zABFiFJHAyu43d99HuVnkMIwJvIMlL39J5yZU42qzrreBecyTaKZYMzbfA9i/YAEixCgigZU1kJtCF57CMbyDVT9bVnXtmGpdT6qBdf3sRDPFmrH5HsAv/akFiBCjiARW1kBuBj0Yxjks+bkVllQzrJ5MA+v6uYlmijVj8z2Ag9ctQIQYRSSwsgZyQ+SwHxf9zBouqtb1hA2s62cmminWjM33AA7/iQWIEKOIBFbWQG6IHMZQ8jNrKKnW9YQNrOtnJpop1ozN9wB++ZsWIEKMIhJYWQO5IXIYQ8nPrKGkWtcTNrCun5loplgzNt8DOJJYgAgxikhgZQ3khshhDCU/s4aSal1P2MC6fmaimWLN2HwP4FeuWYAIMYpIYGUN5IbIYQwlP7OGkmpdT9jAun5moplizdh8D+DoH1uACDGKSGBlDeSGyGEMJT+zhpJqXU/YwLp+ZqKZYs3YfA/gV//IAkSIUUQCK2sgN0QOYyj5mTWUVOt6wgbW9TMTzRRrxuZ7AMf+0AJEiFFEAitrIDdEDmMo+Zk1lFTresIG1vUzE80Ua8bmewDjf2ABIsQoIoGVNZAbIocxlPzMGkqqdT1hA+v6mYlmijVj8z2AZ37fAkSIUUQCK2sgN0QOYyj5mTWUVOt6wgbW9TMTzRRrxuZ7AJ/6PQsQIUYRCaysgdwQOYyh5GfWUFKt6wkbWNfPTDRTrBmb7wH82lULECFGEQmsrIHcEDnsx0U/s4aLqnU9YQPr+pmJZoo1Y/M9gBNXLECEGEUksLIGcjPowTDOYcnPrbCkmmH1ZBpY189NNFOsGZvvAUy8YwEixCgigZU1kJtCF57CMbyDVT9bVnXtmGpdT6qBdf3sRDPFmrH5HsCn5yxAhBhFJLCy+879xlpuFjkMYwLvYMnLX9K5CdXk1nq+cf83yt+7ZilqNjdj8z2AU79rASLEKCKBlTWYnUIn8hjGMZzDRTmnc8OqcbWpBtc0T6KZYs3YfA/gM5csQIQYRSSwskbzn71kaXI6kcNTGMZ+GdY5d63T1T6AecyTaKZYMzbfA/js1y1AhBhFJLCyB7HG6a9biqwsutCDnPToXNbVPKB5zJNoplgzNt8DOPM1CxAhRhEJrOx+Mp97ywLnnnXeZp23LUVmBqFk1s69fW9ttf6fYh7zJJop1ozN9wCef8vann/TssijgMuwso3mfO4Na0OanlB5TujOuWsPu//jeby9a5aCZsu6Wbc043H2q5ZFPw5iFlZ27vX1/3AuNQG1IbrQh7z06Vzoah5Wv5ezw9+7Zjmo2ZrzD+e64/yshchhP6Zgnrp/PH1y1trU340BjKIgozrnrmWpba/S3+6ubaA/dGutM8eZir1PaSY3W/P+8fTPf8Uy6MUIXsBdmMys05tGFwZQwCTmxL0+gkHlR0h5vSmd61XNkSr9BWW7NdLr7GXG2/ddzTKi/Ob9Cxovzlga27Ebp7AIk4V1ekP0YRSTFb3u9QUcxZDqOl6cZr3ptTU7dG5INReq9E8q29WF6+xloaL3lGZyszXvX1F66TV77KWSdWIXxjEPK6vZV7IAWeRRwJzfJ0uYxtPYgye0Vqde79G1adVW9s8pO6+1gjr78fvmNcuutbVea+K/pPfyqxa8/GWLkMdhzMI8Z+r0ZdVXwFxFX9kyLuE4hlWf1+vjurZco3dO2fm1tV6t/gDcHiv6ZjVLfm22V5v8b8u/MmXb0IsRnMcdmNys0xeiD6OYxKLX51vBFZxU7aheX9G1aj2LyhzVGmGdfdz0+u5ohhHN1Nx/UdsdX7xgKXRhEM9gHlZ24UL1b0e5llbfAAr4At73ez2ruI7Tcl3nqtW+r6yCst0aVd/H3d4qeuc1w6D6mv9HFXzpixZ86RWLkMcBTGEF5vzmK9U/jOlr43qIbuzCIZzFu+XeKt7dwPWzytql7NCtVW0Pbm9e74r2fkCzRG62LZvhmHrZMujGbkzgBqzs4svVf1zN1G9YwPUQ27ETYziN61j1M9axqp7TytipzNCtUW1tt6eKjBva+27Nsnl+aNOXX7J2dCDGIUxhBSY1f2DTxZcs4Po2PI4nMYqTuFKRUcuKak+q90llbXPZdfZ8uyJjSnuPNcvm+gmKpRcsg24M4TiuwTw1/7/g1RetTf1dyGNYGZewXJHjW1bNcfXklZFxmXX2ulCRc00ZQ5phc/3IMne89nkLpictQj/24TxuwTwzdfrbuL4VnXgCe/A0prFUkWM6N62aPepxvVtdVq113B4qcm5pr/u098jNsmUzHr91zraiCwMoooRl2MfO1v89oplzlqauA30YwlFcwKKXs6hzR1Xjajtcb939sfY9e/lobyXtdUB735w/ttIdX/mctf328xaiB0MYxxxWYZ6ZdXJS1EToxSCOYFJZc3p9RNdcTeR66mW6NSv2sKqsce3V7Tl0M2zZzMfsc9Y+e8Yi5LAXJ3AVq7Cy3zlT//eKlJNFNwYwioKM6lz3Ws1z9T8w3Vr+2trLVe1tr/YarZezaY7XT1sKHejHCCZwFaswz+2vfqb2D+9+/bMWUBOiC33IS5/Oha6mVr/LdmtUrLmqvUxob/3a66P1Dzq88ayl3zhlnchjBCcwh2WY781TtoAdNXLalBUiK+HauWerv124LJdZuY7WntNeRrS3Tpe15VE83vq0pdGJfuzFOEq4Bavi5tdO1v6QfvPXLXBqXXe9LqNG9i2tPa699Gtvj/a/osFNSaMDOQyhiPO4hhVYDQuYcTcVO6rk7tC1GdXWylnRWue19pD24vb0aN9872alEKEHA9iH45jCjXUexP1aUfaU1tqntXu0l0/IP+Lzk4fQjhBd6NdX4iFM6CbN484DuPF3lDWl7ENaq19ruz18Mv91PQZvw1Z9BXYjxm4cwDN6m5jVDVzE3Q3c8LuqnVfveWUdUHastSKt3fqXWLkJATJ6H3Y3J49BjOAwxnEKL+gr2d3Yy0jkss5NqeaUeg4rY1CZ3VrDrdX6pwxrvC1l9NXp3h56deN26avX3cz9OIiCPkSLen1Q10ZUu0u9vcqKlN36xzw3+CvCfVBv043rxHbdzJzev/N6O4n1ul/XelXbqd5tymp9xTfwMB7Tt68ZfWhmJZLyf4eqSaunddMf8gd4IK0P0tbROlpH62gdraN1tI5Ndfw/FwKLCmEUZNEAAAAASUVORK5CYII=
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-body
// @license      MIT
// ==/UserScript==

(() => {
  const css = document.createElement('style');
  css.textContent = 'html, body { overflow: auto !important; }';

  // Function to append the CSS to the document head
  function appendCSS() {
    const target = document.head || document.documentElement;
    if (target) {
      target.append(css);
    }
    console.log('CSS applied: html, body { overflow: auto !important; }');
  }

  // Get stored sites from GM_getValue
  // eslint-disable-next-line no-undef
  const sites = GM_getValue('scrollableSites', []);
  const currentSite = window.location.hostname;

  // Check if the current site is in the list and apply CSS
  if (sites.includes(currentSite)) {
    appendCSS();
  }

  // Add keyboard shortcut [Ctrl + Alt + Shift + X]
  window.addEventListener('keydown', (e) => {
    if (e.key === 'X' && e.altKey && e.shiftKey && e.ctrlKey) {
      appendCSS();
    }
  });

  // Function to add the current site to the list
  function addCurrentSite() {
    if (!sites.includes(currentSite)) {
      sites.push(currentSite); // eslint-disable-next-line no-undef
      GM_setValue('scrollableSites', sites);
      alert(`${currentSite} has been added to the list, effective after refresh.`);
    } else {
      alert('This site is already in the list.');
    }
  }

  // Add menu command to add the current site
  // eslint-disable-next-line no-undef
  GM_registerMenuCommand('Set current site to append CSS by default.', addCurrentSite);
})();
