/* Tạo thẻ QR in cho học sinh: 4 cạnh ghi A, B, C, D.
   Hai chế độ in:
   - 'page'  : mỗi em một trang A4 riêng, mã QR và chữ to (để quét xa, không bị nhỏ).
   - 'grid'  : nhiều thẻ trên một trang (để xem nhanh hoặc tiết kiệm giấy). */
const Cards={
  mode:'page',
  qrData(text,cell){
    if(typeof qrcode!=='function')return '';
    try{const q=qrcode(0,'M');q.addData(text);q.make();return q.createDataURL(cell||10,0)}
    catch(e){return ''}
  },
  render(host,names,cfg){
    if(!host)return;
    if(typeof qrcode!=='function'){
      host.innerHTML='<div class="warn err">Chưa tải được thư viện tạo mã QR (vendor/qrcode.js).</div>';
      return;
    }
    cfg=cfg||{};
    const title=(cfg.title||'RUNG CHUÔNG VÀNG');
    const school=(cfg.school||'');
    host.className='cards '+(Cards.mode==='grid'?'cards-grid':'cards-page');
    host.innerHTML=names.map((nm,i)=>{
      const id=i+1,url=Cards.qrData('GB'+id,Cards.mode==='grid'?8:12);
      const corners=`<span class="Lt t">A</span><span class="Lt r">B</span>`
                   +`<span class="Lt b">C</span><span class="Lt l">D</span>`;
      if(Cards.mode==='grid'){
        return `<div class="cardwrap">
          <div class="card"><span class="cno">#${id}</span>${corners}
            <img class="qr" src="${url}" alt="QR ${id}"></div>
          <div class="cap">#${id} ${esc(nm)}</div></div>`;
      }
      // một thẻ mỗi trang
      return `<div class="cardpage">
        <div class="cp-head">
          <div class="cp-ttl">${esc(title)}</div>
          ${school?`<div class="cp-sch">${esc(school)}</div>`:''}
        </div>
        <div class="card big">
          <span class="cno">#${id}</span>
          ${corners}
          <img class="qr" src="${url}" alt="QR ${id}">
        </div>
        <div class="cp-name"><span class="cp-no">${id}</span>${esc(nm)}</div>
        <div class="cp-foot">Xoay thẻ sao cho chữ cái của đáp án em chọn nằm ở <b>cạnh trên</b>, rồi giơ lên cho máy quét.</div>
      </div>`;
    }).join('');
  }
};
window.Cards=Cards;
