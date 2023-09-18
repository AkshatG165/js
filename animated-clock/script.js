// function clock() {
//   const now = new Date();
//   const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext('2d');

//   // Setup canvas
//   ctx.save(); // save the default state
//   ctx.clearRect(0, 0, 500, 500);
//   ctx.translate(250, 250); // Put 0,0 in the middle
//   ctx.rotate(-Math.PI / 2); // Rotate clock -90deg

//   // Set default styles
//   ctx.strokeStyle = '#000000';
//   ctx.fillStyle = '#f4f4f4';
//   ctx.lineWidth = 5;
//   ctx.lineCap = 'round';

//   // Draw clock face/border
//   ctx.save();
//   ctx.beginPath();
//   ctx.lineWidth = 14;
//   ctx.strokeStyle = '#800000';
//   ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
//   ctx.stroke();
//   ctx.fill();
//   ctx.restore();

//   // Draw hour lines
//   ctx.save();
//   for (let i = 0; i < 12; i++) {
//     ctx.beginPath();
//     ctx.rotate(Math.PI / 6);
//     ctx.moveTo(100, 0);
//     ctx.lineTo(120, 0);
//     ctx.stroke();
//   }
//   ctx.restore();

//   // Draw minute lines
//   ctx.save();
//   ctx.lineWidth = 4;
//   for (let i = 0; i < 60; i++) {
//     if (i % 5 !== 0) {
//       ctx.beginPath();
//       ctx.moveTo(117, 0);
//       ctx.lineTo(120, 0);
//       ctx.stroke();
//     }
//     ctx.rotate(Math.PI / 30);
//   }
//   ctx.restore();

//   // Get current time
//   const hr = now.getHours() % 12;
//   const min = now.getMinutes();
//   const sec = now.getSeconds();

//   // console.log(`${hr}:${min}:${sec}`);

//   // Draw hour hand
//   ctx.save();
//   ctx.rotate(
//     (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
//   );
//   ctx.strokeStyle = '#800000';
//   ctx.lineWidth = 14;
//   ctx.beginPath();
//   ctx.moveTo(-20, 0);
//   ctx.lineTo(80, 0);
//   ctx.stroke();
//   ctx.restore();

//   // Draw min hand
//   ctx.save();
//   ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
//   ctx.strokeStyle = '#800000';
//   ctx.lineWidth = 10;
//   ctx.beginPath();
//   ctx.moveTo(-28, 0);
//   ctx.lineTo(112, 0);
//   ctx.stroke();
//   ctx.restore();

//   // Draw sec hand
//   ctx.save();
//   ctx.rotate((sec * Math.PI) / 30);
//   ctx.strokeStyle = '#FF7F50';
//   ctx.fillStyle = '#FF7F50';
//   ctx.lineWidth = 6;
//   ctx.beginPath();
//   ctx.moveTo(-30, 0);
//   ctx.lineTo(100, 0);
//   ctx.stroke();
//   ctx.beginPath();
//   ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
//   ctx.fill();
//   ctx.restore();

//   ctx.restore(); // restore default state

//   requestAnimationFrame(clock);
// }

// requestAnimationFrame(clock);

function clock() {
  const now = new Date();
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();
  //console.log(hr, min, sec);

  const canvas = document.getElementById('canvas');
  canvas.style.border = '1px solid';
  const ctx = canvas.getContext('2d');

  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = 'darkred';
  ctx.fillStyle = 'rgb(240, 240, 240)';
  ctx.lineWidth = 10;
  ctx.arc(250, 250, 150, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  const radius = 120;
  let x1 = 250;
  let y1 = 250;

  //add minute ticks
  for (let i = 0; i < 360; ) {
    x = Math.round(Math.cos((i * Math.PI) / 180) * radius + x1);
    y = Math.round(Math.sin((i * Math.PI) / 180) * radius + y1);

    x2 = Math.round(-Math.cos((i * Math.PI) / 180) * 5 + x);
    y2 = Math.round(-Math.sin((i * Math.PI) / 180) * 5 + y);
    i += 360 / 60;

    // Draw lines
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  //add hours ticks
  for (let i = 0; i < 360; ) {
    x = Math.round(Math.cos((i * Math.PI) / 180) * radius + x1);
    y = Math.round(Math.sin((i * Math.PI) / 180) * radius + y1);

    x2 = Math.round(-Math.cos((i * Math.PI) / 180) * 20 + x);
    y2 = Math.round(-Math.sin((i * Math.PI) / 180) * 20 + y);

    i += 360 / 12;

    // Draw lines
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // //add hour numbering
  // for (let i = 0; i < 360; ) {
  //   x = Math.round(Math.cos(-Math.PI / 3 + (i * Math.PI) / 180) * radius + x1);
  //   y = Math.round(Math.sin(-Math.PI / 3 + (i * Math.PI) / 180) * radius + y1);

  //   i += 360 / 12;

  //   //draw numbering
  //   ctx.font = '15px Arial';
  //   ctx.lineWidth = 1;
  //   ctx.fillStyle = 'black';
  //   ctx.fillText(i / 30, x, y);
  // }

  //add hour hand
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = 'darkred';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  angle =
    -Math.PI / 2 +
    ((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);

  ctx.moveTo(
    Math.round(Math.cos(Math.PI + angle) * 30 + x1),
    Math.round(Math.sin(Math.PI + angle) * 30 + y1)
  );
  ctx.lineTo(
    Math.round(Math.cos(angle) * 70 + x1),
    Math.round(Math.sin(angle) * 70 + y1)
  );
  ctx.stroke();
  ctx.restore();

  //add minute hand
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = 'darkred';
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  angle = -Math.PI / 2 + ((Math.PI / 30) * min + (Math.PI / 2160) * sec);

  ctx.moveTo(
    Math.round(Math.cos(Math.PI + angle) * 30 + x1),
    Math.round(Math.sin(Math.PI + angle) * 30 + y1)
  );
  ctx.lineTo(
    Math.round(Math.cos(angle) * 100 + x1),
    Math.round(Math.sin(angle) * 100 + y1)
  );
  ctx.stroke();
  ctx.restore();

  //add minute hand
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = 'coral';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  ctx.fillStyle = 'coral';
  ctx.arc(250, 250, 8, 0, Math.PI * 2);
  ctx.fill();

  angle = -Math.PI / 2 + (Math.PI / 30) * sec;

  ctx.moveTo(
    Math.round(Math.cos(Math.PI + angle) * 30 + x1),
    Math.round(Math.sin(Math.PI + angle) * 30 + y1)
  );
  ctx.lineTo(
    Math.round(Math.cos(angle) * 90 + x1),
    Math.round(Math.sin(angle) * 90 + y1)
  );
  ctx.stroke();
  ctx.restore();

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);
