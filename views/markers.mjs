const markers = [
"\
<a-marker type='barcode' value='642' id='marker-barcode-0' registerevents>\
  <a-entity>\
    <a-image src='#asset-0' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 0 360'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
</a-marker>\
",
"\
<a-marker type='barcode' value='643' id='marker-barcode-1' registerevents>\
  <a-entity>\
    <a-image src='#asset-1' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='644' id='marker-barcode-2' registerevents>\
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
<a-marker type='barcode' value='645' id='marker-barcode-3' registerevents>\
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
<a-marker type='barcode' value='646' id='marker-barcode-4' registerevents>\
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
<a-marker type='barcode' value='647' id='marker-barcode-5' registerevents>\
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
<a-marker type='barcode' value='648' id='marker-barcode-6' registerevents>\
  <a-entity scale='0.05 0.05 0.05' rotation='270 0 0' obj-model='obj: url(./milestone-images/hanger/10922_Coat_hangers_v3_LOD3.obj); mtl: url(./milestone-images/hanger/10922_Coat_hangers_v3_LOD3.mtl)'>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='649' id='marker-barcode-7' registerevents>\
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
<a-marker type='barcode' value='650' id='marker-barcode-8' registerevents>\
  <a-entity scale='0.03 0.03 0.03' rotation='-90 0 0' obj-model='obj: url(./milestone-images/11721_darboard_V4_L3.obj); mtl: url(./milestone-images/11721_darboard_V4_L3.mtl)'>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='-90 0 360'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
</a-marker>\
",
"\
<a-marker type='barcode' value='651' id='marker-barcode-9' registerevents>\
  <a-entity>\
    <a-image src='#asset-9' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='652' id='marker-barcode-10' registerevents>\
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
<a-marker type='barcode' value='653' id='marker-barcode-11' registerevents>\
  <a-entity>\
    <a-image src='#asset-11' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='654' id='marker-barcode-12' registerevents>\
  <a-entity>\
    <a-sphere src='./milestone-images/textures/earth-texture.jpg' scale='0.5 0.5 0.5' ></a-sphere>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='655' id='marker-barcode-13' registerevents>\
  <a-entity>\
    <a-image src='#asset-13' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='656' id='marker-barcode-14' registerevents>\
  <a-entity scale='0.03 0.03 0.03' obj-model='obj: url(./milestone-images/tire/Car_tire_2.obj);'>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='657' id='marker-barcode-15' registerevents>\
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
<a-marker type='barcode' value='658' id='marker-barcode-16' registerevents>\
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
<a-marker type='barcode' value='659' id='marker-barcode-17' registerevents>\
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
<a-marker type='barcode' value='660' id='marker-barcode-18' registerevents>\
  <a-entity scale='0.03 0.03 0.03' rotation='270 0 0' obj-model='obj: url(./milestone-images/umbrella/12981_umbrella_v1_l2.obj); mtl: url(./milestone-images/umbrella/12981_umbrella_v1_l2.mtl)'>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='661' id='marker-barcode-19' registerevents>\
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
<a-marker type='barcode' value='662' id='marker-barcode-20' registerevents>\
  <a-entity scale='0.03 0.03 0.03' rotation='270 0 0' obj-model='obj: url(./milestone-images/schloss/13020_Aquarium_Castle_v1_L1.obj); mtl: url(./milestone-images/schloss/13020_Aquarium_Castle_v1_L1.mtl)'>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\
",
"\
</a-marker>\
<a-marker type='barcode' value='663' id='marker-barcode-21' registerevents>\
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
<a-marker type='barcode' value='664' id='marker-barcode-22' registerevents>\
  <a-entity>\
    <a-image src='#asset-22' side='double'></a-image>\
    <a-animation attribute='rotation'\
                dur='10000'\
                fill='none'\
                to='0 360 0'\
                repeat='indefinite'></a-animation>\
  </a-entity>\

</a-marker>\
"
];

export default markers;
