const markers = [
"\
<a-marker type='barcode' value='642' id='marker-barcode-0' eventListener>\
  <a-entity>\
    <a-image src='#asset-0' side='double' rotate='270 0 0'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 0 360'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
</a-marker>\
",
"\
<a-marker type='barcode' value='643' id='marker-barcode-1' eventListener>\
  <a-entity scale ='0.03 0.03 0.03' rotation='270 0 0'>\
    <a-obj-model src='#asset-1-obj' mtl='#asset-1-mtl'></a-obj-model>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='644' id='marker-barcode-2' eventListener>\
  <a-entity>\
    <a-image src='#asset-2' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
</a-marker>\
",
"\
<a-marker type='barcode' value='645' id='marker-barcode-3' eventListener>\
  <a-entity>\
    <a-image src='#asset-3' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='646' id='marker-barcode-4' eventListener>\
  <a-entity>\
    <a-image src='#asset-4' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='647' id='marker-barcode-5' eventListener>\
  <a-entity>\
    <a-image src='#asset-5' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='648' id='marker-barcode-6' eventListener>\
  <a-entity scale='0.05 0.05 0.05' rotation='270 0 0'>\
  <a-obj-model src='#asset-6-obj' mtl='#asset-6-mtl'></a-obj-model>\
  <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='649' id='marker-barcode-7' eventListener>\
  <a-entity>\
    <a-image src='#asset-7' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='650' id='marker-barcode-8' eventListener>\
  <a-entity scale='0.03 0.03 0.03' rotation='-90 0 0'>\
  <a-obj-model src='#asset-8-obj' mtl='#asset-8-mtl'></a-obj-model>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='-90 0 360'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
</a-marker>\
",
"\
<a-marker type='barcode' value='651' id='marker-barcode-9' eventListener>\
  <a-entity>\
  <a-obj-model src='#asset-9-obj' mtl='#asset-9-mtl'></a-obj-model>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='652' id='marker-barcode-10' eventListener>\
  <a-entity>\
    <a-image src='#asset-10' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='653' id='marker-barcode-11' eventListener>\
  <a-entity rotation='270 0 0'>\
    <a-image src='#asset-11' side='double' ></a-image>\
    <!--<a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>-->\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='654' id='marker-barcode-12' eventListener>\
  <a-entity>\
    <a-sphere src='./milestone-images/earth-texture.jpg' scale='0.5 0.5 0.5' ></a-sphere>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='655' id='marker-barcode-13' eventListener>\
  <a-entity>\
  <a-obj-model src='#asset-13-obj' mtl='#asset-13-mtl'></a-obj-model>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='656' id='marker-barcode-14' eventListener>\
  <a-entity scale='0.03 0.03 0.03'>\
  <a-obj-model src='#asset-14-obj' mtl='#asset-14-mtl'></a-obj-model>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='657' id='marker-barcode-15' eventListener>\
  <a-entity>\
    <a-image src='#asset-15' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='658' id='marker-barcode-16' eventListener>\
  <a-entity>\
    <a-image src='#asset-16' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='659' id='marker-barcode-17' eventListener>\
  <a-entity>\
    <a-image src='#asset-17' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='660' id='marker-barcode-18' eventListener>\
  <a-entity scale='0.03 0.03 0.03' rotation='270 0 0'>\
  <a-obj-model src='#asset-18-obj' mtl='#asset-18-mtl'></a-obj-model>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='661' id='marker-barcode-19' eventListener>\
  <a-entity>\
    <a-image src='#asset-19' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='662' id='marker-barcode-20' eventListener>\
  <a-entity scale='0.03 0.03 0.03' rotation='270 0 0'>\
  <a-obj-model src='#asset-20-obj' mtl='#asset-20-mtl'></a-obj-model>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='663' id='marker-barcode-21' eventListener>\
  <a-entity>\
    <a-image src='#asset-21' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='664' id='marker-barcode-22' eventListener>\
  <a-entity>\
    <a-image src='#asset-22' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
</a-marker>\
",
"\
</a-marker>\
<a-marker type='barcode' value='662' id='marker-barcode-23' eventListener>\
  <a-entity scale='0.03 0.03 0.03' rotation='270 0 0'>\
  <a-obj-model src='#asset-23-obj' mtl='#asset-23-mtl'></a-obj-model>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='662' id='marker-barcode-24' eventListener>\
  <a-entity scale='0.03 0.03 0.03' rotation='270 0 0'>\
  <a-obj-model src='#locked-obj' mtl='#locked-mtl'></a-obj-model>\
  </a-entity>\
"
];

export default markers;
