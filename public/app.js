const money = n => "Rs. " + Number(n).toLocaleString("en-PK");
const menu = [
  {name:"Chicken Spring Rolls",cat:"Starters",price:450,desc:"Crispy rolls with a savoury chicken filling.",img:"/assets/chicken-spring-rolls.webp"},
  {name:"Veg Spring Rolls",cat:"Starters",price:350,desc:"Golden pastry filled with seasoned vegetables.",img:"/assets/veg-spring-rolls.webp"},
  {name:"Chicken Nuggets",cat:"Starters",price:450,desc:"Crunchy bite-sized chicken favourites.",img:"/assets/chicken-nuggets.webp"},
  {name:"French Fries",cat:"Starters",price:250,desc:"Hot, crisp fries with a light seasoning.",img:"/assets/french-fries.webp"},
  {name:"Chicken Cheese Balls",cat:"Starters",price:450,desc:"Cheesy, crispy bites served hot.",img:"/assets/chicken-cheese-balls.webp"},
  {name:"Mozzarella Sticks",cat:"Starters",price:450,desc:"Stretchy mozzarella in a crisp crumb coat.",img:"/assets/mozzarella-sticks.webp"},
  {name:"Crispy Wings",cat:"Starters",price:550,desc:"Crispy chicken wings with house seasoning.",img:"/assets/crispy-wings.webp"},
  {name:"Mix Platter",cat:"Starters",price:1200,desc:"A shareable selection of popular starters.",img:"/assets/mix-platter.webp"},
  {name:"Chicken Karahi",cat:"Main Course",price:1200,desc:"Traditional chicken karahi with rich spices.",img:"/assets/chicken-karahi.webp"},
  {name:"Mutton Karahi",cat:"Main Course",price:1800,desc:"Tender mutton cooked in a bold karahi masala.",img:"/assets/mutton-karahi.webp"},
  {name:"Chicken Handi",cat:"Main Course",price:1200,desc:"Creamy, aromatic chicken handi.",img:"/assets/chicken-handi.webp"},
  {name:"Mutton Handi",cat:"Main Course",price:1800,desc:"Slow-cooked mutton in a rich handi gravy.",img:"/assets/mutton-handi.webp"},
  {name:"Chicken Jalfrezi",cat:"Main Course",price:1100,desc:"Chicken tossed with peppers and spices.",img:"/assets/chicken-jalfrezi.webp"},
  {name:"Chicken Masala",cat:"Main Course",price:1000,desc:"A comforting chicken masala curry.",img:"/assets/chicken-masala.webp"},
  {name:"Beef Masala",cat:"Main Course",price:1200,desc:"Beef simmered in a deeply flavoured masala.",img:"/assets/beef-masala.webp"},
  {name:"Daal Mash",cat:"Main Course",price:700,desc:"Creamy lentils finished with a fragrant tempering.",img:"/assets/daal-mash.webp"},
  {name:"Chicken Biryani",cat:"Biryani",price:800,desc:"Fragrant basmati rice layered with spiced chicken.",img:"/assets/chicken-biryani.webp"},
  {name:"Mutton Biryani",cat:"Biryani",price:1200,desc:"Aromatic biryani with tender mutton pieces.",img:"/assets/food-chicken-biryani.webp"},
  {name:"Beef Biryani",cat:"Biryani",price:1000,desc:"Spiced beef and fragrant rice, cooked together.",img:"/assets/beef-biryani.webp"},
  {name:"Fish Biryani",cat:"Biryani",price:1100,desc:"A flavourful rice dish with seasoned fish.",img:"/assets/food-fish-rice.webp"},
  {name:"Special Deera Biryani",cat:"Biryani",price:1500,desc:"Our special house-style biryani.",img:"/assets/special-deera-biryani.webp"},
  {name:"Chicken Tikka",cat:"BBQ & Grill",price:700,desc:"Chargrilled chicken with a smoky spice rub.",img:"/assets/chicken-tikka.webp"},
  {name:"Chicken Malai Tikka",cat:"BBQ & Grill",price:750,desc:"Creamy marinated chicken grilled to perfection.",img:"/assets/chicken-malai-tikka.webp"},
  {name:"Beef Boti",cat:"BBQ & Grill",price:900,desc:"Juicy beef cubes with a chargrilled finish.",img:"/assets/beef-boti.webp"},
  {name:"Mutton Seekh Kabab",cat:"BBQ & Grill",price:950,desc:"Traditional minced mutton kababs from the grill.",img:"/assets/mutton-seekh-kabab.webp"},
  {name:"Chicken Seekh Kabab",cat:"BBQ & Grill",price:750,desc:"Juicy chicken seekh kababs with herbs.",img:"/assets/chicken-seekh-kabab.webp"},
  {name:"Mix BBQ Platter",cat:"BBQ & Grill",price:1800,desc:"A generous selection from our barbecue grill.",img:"/assets/mix-bbq-platter.webp"},
  {name:"Chicken Fried Rice",cat:"Chinese",price:700,desc:"Wok-tossed rice with chicken and vegetables.",img:"/assets/food-chicken-fried-rice.webp"},
  {name:"Veg Fried Rice",cat:"Chinese",price:550,desc:"Wok-fried rice with fresh vegetables.",img:"/assets/food-veg-fried-rice.webp"},
  {name:"Chicken Chowmein",cat:"Chinese",price:700,desc:"Noodles tossed with chicken and vegetables.",img:"/assets/food-chicken-chowmein.webp"},
  {name:"Veg Chowmein",cat:"Chinese",price:550,desc:"Classic vegetable chowmein noodles.",img:"/assets/food-veg-chowmein.webp"},
  {name:"Chicken Manchurian",cat:"Chinese",price:750,desc:"Chicken in a tangy, savoury Manchurian sauce.",img:"/assets/chicken-manchurian.webp"},
  {name:"Veg Manchurian",cat:"Chinese",price:650,desc:"Vegetable dumplings in a bold sauce.",img:"/assets/veg-manchurian.webp"},
  {name:"Zinger Burger",cat:"Fast Food",price:450,desc:"Crispy chicken fillet, lettuce and house sauce.",img:"/assets/zinger-burger.webp"},
  {name:"Chicken Burger",cat:"Fast Food",price:350,desc:"A classic chicken burger with fresh toppings.",img:"/assets/chicken-burger.webp"},
  {name:"Beef Burger",cat:"Fast Food",price:400,desc:"Juicy beef patty with cheese and fresh salad.",img:"/assets/beef-burger.webp"},
  {name:"Club Sandwich",cat:"Fast Food",price:500,desc:"Toasted triple-decker sandwich with fillings.",img:"/assets/club-sandwich.webp"},
  {name:"Pizza (Medium)",cat:"Fast Food",price:1000,desc:"Freshly baked medium pizza with melted cheese.",img:"/assets/food-cheese-pizza.webp"},
  {name:"Pizza (Large)",cat:"Fast Food",price:1400,desc:"A large pizza made for sharing.",img:"/assets/food-pepperoni-pizza.webp"},
  {name:"Fresh Lime Soda",cat:"Beverages",price:200,desc:"Refreshing lime soda served chilled.",img:"/assets/fresh-lime-soda.webp"},
  {name:"Mint Margarita",cat:"Beverages",price:250,desc:"Cool mint and citrus refresher.",img:"/assets/mint-margarita.webp"},
  {name:"Cold Coffee",cat:"Beverages",price:300,desc:"Chilled coffee blended until smooth.",img:"/assets/food-cold-coffee.webp"},
  {name:"Milk Shake",cat:"Beverages",price:300,desc:"Thick and creamy chilled milkshake.",img:"/assets/food-chocolate-milkshake.webp"},
  {name:"Soft Drinks",cat:"Beverages",price:150,desc:"Assorted chilled soft drinks.",img:"/assets/food-soft-drinks.webp"},
  {name:"Water Bottle",cat:"Beverages",price:100,desc:"Bottled drinking water.",img:"/assets/food-water-bottle.webp"},
  {name:"Gulab Jamun",cat:"Desserts",price:200,desc:"Soft milk dumplings in fragrant syrup.",img:"/assets/food-gulab-jamun.webp"},
  {name:"Ice Cream",cat:"Desserts",price:250,desc:"A cool, creamy dessert favourite.",img:"/assets/food-ice-cream.webp"},
  {name:"Fruit Cream",cat:"Desserts",price:300,desc:"Seasonal fruit folded into sweet cream.",img:"/assets/food-fruit-cream.webp"},
  {name:"Kulfi",cat:"Desserts",price:250,desc:"Traditional frozen milk dessert.",img:"/assets/food-kulfi.webp"},
  {name:"Kheer",cat:"Desserts",price:200,desc:"Creamy rice pudding with cardamom.",img:"/assets/food-kheer.webp"}
];


let activeCategory="All", cart=JSON.parse(localStorage.getItem("apnaDeeraCart")||"[]");
const tableId=new URLSearchParams(location.search).get("table")||"";
const $=s=>document.querySelector(s);
const categories=["All",...new Set(menu.map(x=>x.cat))];
function renderTabs(){ $("#menuTabs").innerHTML=categories.map(c=>`<button class="${c===activeCategory?"active":""}" data-cat="${c}">${c}</button>`).join("");}
function renderMenu(){
 const q=$("#menuSearch").value.toLowerCase();
 const list=menu.filter(x=>(activeCategory==="All"||x.cat===activeCategory)&&(x.name.toLowerCase().includes(q)||x.desc.toLowerCase().includes(q)));
 $("#menuGrid").innerHTML=list.map((x)=>`<article class="dish-card"><img loading="lazy" src="${x.img}" alt="${x.name}" onerror="this.style.display='none'"><div class="dish-info"><h3>${x.name}</h3><p>${x.desc}</p><div class="dish-bottom"><span class="price">${money(x.price)}</span><button class="add-btn" data-add="${x.name}">+ ADD</button></div></div></article>`).join("")||"<p>No dishes found. Try another search.</p>";
}
function saveCart(){localStorage.setItem("apnaDeeraCart",JSON.stringify(cart));renderCart();}
function addToCart(name){const item=menu.find(x=>x.name===name);const found=cart.find(x=>x.name===name);if(found)found.qty++;else cart.push({...item,qty:1});saveCart();toast(name+" added to your cart.");}
function renderCart(){
 const count=cart.reduce((a,x)=>a+x.qty,0),total=cart.reduce((a,x)=>a+x.price*x.qty,0);
 $("#cartCount").textContent=count;$("#cartTotal").textContent=money(total);$("#checkoutTotal").textContent=money(total);
 $("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><div><b>${x.name}</b><small>${money(x.price)} each</small></div><div class="qty-controls"><button data-minus="${x.name}">−</button><span>${x.qty}</span><button data-plus="${x.name}">+</button></div></div>`).join(""):'<p class="empty-cart">Your cart is waiting for something delicious.</p>';
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600);}
function openCart(){ $("#cartDrawer").classList.add("open");$("#cartOverlay").classList.add("open");}
function closeCart(){ $("#cartDrawer").classList.remove("open");$("#cartOverlay").classList.remove("open");}
async function api(url,opts={}){const r=await fetch(url,{headers:{"Content-Type":"application/json"},...opts});const data=await r.json();if(!r.ok)throw new Error(data.error||"Something went wrong");return data;}

renderTabs();renderMenu();renderCart();$("#year").textContent=new Date().getFullYear();
$("#menuTabs").addEventListener("click",e=>{const b=e.target.closest("[data-cat]");if(!b)return;activeCategory=b.dataset.cat;renderTabs();renderMenu();});
$("#menuSearch").addEventListener("input",renderMenu);
$("#menuGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(b.dataset.add);});
$("#cartItems").addEventListener("click",e=>{const plus=e.target.closest("[data-plus]"),minus=e.target.closest("[data-minus]");if(plus){cart.find(x=>x.name===plus.dataset.plus).qty++;saveCart();}if(minus){const x=cart.find(x=>x.name===minus.dataset.minus);x.qty--;if(x.qty<=0)cart=cart.filter(y=>y.name!==x.name);saveCart();}});
$("#cartOpen").onclick=openCart;$("#cartClose").onclick=closeCart;$("#cartOverlay").onclick=closeCart;
$("#checkoutOpen").onclick=()=>{if(!cart.length)return toast("Please add a dish first.");closeCart();$("#checkoutModal").classList.add("open");};
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$("#"+b.dataset.close).classList.remove("open"));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open");}));
$("#checkoutForm").addEventListener("submit",async e=>{
 e.preventDefault();if(!cart.length)return;
 const f=new FormData(e.target),payload={customer:f.get("customer"),phone:f.get("phone"),address:f.get("address"),items:cart.map(x=>({name:x.name,price:x.price,qty:x.qty})),total:cart.reduce((a,x)=>a+x.price*x.qty,0),payment:f.get("payment"),orderType:f.get("orderType"),tableId,scheduledAt:f.get("scheduledAt")||new Date().toISOString(),notes:f.get("notes")};
 try{const result=await api("/api/orders",{method:"POST",body:JSON.stringify(payload)});cart=[];saveCart();e.target.reset();$("#checkoutMessage").textContent="";$("#checkoutModal").classList.remove("open");toast("Order placed! Your order ID: "+result.order.id);alert("Thank you! Your order is placed.\nOrder ID: "+result.order.id+"\nStatus: Pending\nPayment: "+result.order.payment);}catch(err){$("#checkoutMessage").textContent=err.message;}
});
$("#reservationForm").addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.target);try{const r=await api("/api/reservations",{method:"POST",body:JSON.stringify(Object.fromEntries(f))});$("#reservationMessage").textContent="Request received! Reference: "+r.reservation.id;e.target.reset();}catch(err){$("#reservationMessage").textContent=err.message;}});
$("#reviewForm").addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.target);try{await api("/api/reviews",{method:"POST",body:JSON.stringify(Object.fromEntries(f))});$("#reviewMessage").textContent="Thank you for sharing your review.";e.target.reset();loadReviews();}catch(err){$("#reviewMessage").textContent=err.message;}});
async function loadReviews(){try{const data=await api("/api/reviews");if(data.length)$("#reviewList").innerHTML=data.map(r=>`<article class="review-item"><div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div><p>${escapeHtml(r.message)}</p><small>— ${escapeHtml(r.name)}</small></article>`).join("");}catch{}}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
loadReviews();

const slides=[
 "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1900&q=90",
 "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1900&q=90",
 "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1900&q=90"
];let slide=0;
function setSlide(n){slide=n;$(".hero").style.backgroundImage=`url("${slides[slide]}")`;document.querySelectorAll(".hero-dots button").forEach((b,i)=>b.classList.toggle("active",i===slide));}
document.querySelectorAll(".hero-dots button").forEach(b=>b.onclick=()=>setSlide(Number(b.dataset.slide)));setSlide(0);setInterval(()=>setSlide((slide+1)%slides.length),5500);
$("#mobileToggle").onclick=()=>$("#mainNav").classList.toggle("open");document.querySelectorAll("#mainNav a").forEach(a=>a.onclick=()=>$("#mainNav").classList.remove("open"));

const siteUrl=location.origin+location.pathname;
function tableUrl(id){return siteUrl+(id?"?table="+encodeURIComponent(id):"")+"#menu";}
function makeQR(target,id="T01"){const el=$(target);if(!el)return;el.innerHTML="";if(window.QRCode){new QRCode(el,{text:tableUrl(id),width:170,height:170,colorDark:"#090806",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H});}else{el.innerHTML="<p class=\"form-message\">QR generator could not load. Check internet and refresh.</p>";}}
const tableSelect=$("#qrTableSelect");
if(tableSelect){tableSelect.value=tableId||"T01";makeQR("#tableQr",tableSelect.value);tableSelect.addEventListener("change",()=>makeQR("#tableQr",tableSelect.value));}
$("#showQr").onclick=()=>{$("#qrModal").classList.add("open");makeQR("#largeQr",tableSelect?.value||"T01");};
$("#copySiteUrl").onclick=async()=>{try{await navigator.clipboard.writeText(tableUrl(tableSelect?.value||"T01"));toast("Table QR link copied.");}catch{toast("Copy not available in this browser.");}};
let scanner=null, scannerRunning=false;
$("#scannerOpen").onclick=async()=>{
  $("#scannerModal").classList.add("open");
  if(!window.Html5Qrcode){toast("QR scanner could not load. Check your internet connection and refresh.");return;}
  try{
    scanner=new Html5Qrcode("reader");
    await scanner.start({facingMode:"environment"},{fps:10,qrbox:{width:220,height:220}},async decoded=>{
      if(scannerRunning===false)return;scannerRunning=false;
      try{await scanner.stop();}catch{}try{scanner.clear();}catch{}scanner=null;
      $("#scannerModal").classList.remove("open");
      try{
        const scanned=new URL(decoded,location.href);
        const table=scanned.searchParams.get("table");
        if(scanned.origin!==location.origin){toast("This QR belongs to a different website; opening it was blocked.");return;}
        if(table && /^T\d{2}$/i.test(table)){location.href=tableUrl(table.toUpperCase());return;}
        if(scanned.pathname==="/"||scanned.pathname===location.pathname){location.href=scanned.href;return;}
        toast("QR scanned, but it is not a valid Apna Deera table QR.");
      }catch{toast("The scanned QR code is not a valid web link.");}
    },()=>{});
    scannerRunning=true;
  }catch(err){scannerRunning=false;scanner=null;toast("Camera unavailable. Allow camera access and use localhost or HTTPS.");}
};
async function stopScanner(){scannerRunning=false;if(scanner){try{await scanner.stop();}catch{}try{scanner.clear();}catch{}scanner=null;}$("#scannerModal").classList.remove("open");}
$("#stopScanner").onclick=stopScanner;$("#scannerModal .modal-close").onclick=stopScanner;

$("#chatLaunch").onclick=()=>$("#chatWidget").classList.toggle("open");$("#chatClose").onclick=()=>$("#chatWidget").classList.remove("open");
function botReply(q){const s=q.toLowerCase();if(s.includes("time")||s.includes("open")||s.includes("timing"))return"We welcome guests daily from 12:00 PM to 12:00 AM. Please call or WhatsApp +92 302 1360530 to confirm holiday timings.";if(s.includes("book")||s.includes("reservation")||s.includes("table"))return"You can request a table using the Reservation section on this website, or WhatsApp us at +92 302 1360530.";if(s.includes("order")||s.includes("delivery")||s.includes("cart"))return"Browse our Menu, tap + Add on your favourite dishes, open your cart and complete checkout. Your order is saved with a Pending status.";if(s.includes("payment")||s.includes("pay"))return"Available demo checkout options are Cash on Delivery, Cash at Restaurant, JazzCash, EasyPaisa and Bank Transfer. Please confirm transfer details with the restaurant before sending money.";if(s.includes("address")||s.includes("location")||s.includes("where"))return"We are located at Devri Road, Ghotki.";if(s.includes("menu")||s.includes("price")||s.includes("food"))return"Our menu includes Starters, Main Course, Biryani, BBQ & Grill, Chinese, Fast Food, Beverages and Desserts. Visit the Menu section to see dishes and prices.";if(s.includes("contact")||s.includes("phone")||s.includes("whatsapp"))return"Call or WhatsApp +92 302 1360530, or email toqeermemon98@gmail.com.";return"I can help with our menu, prices, opening hours, ordering, payments, reservations and location. What would you like to know?";}
function sendChat(q){if(!q.trim())return;const body=$("#chatBody");body.insertAdjacentHTML("beforeend",`<div class="user-msg">${escapeHtml(q)}</div>`);setTimeout(()=>{body.insertAdjacentHTML("beforeend",`<div class="bot-msg">${escapeHtml(botReply(q))}</div>`);body.scrollTop=body.scrollHeight;},350);body.scrollTop=body.scrollHeight;}
$("#chatForm").onsubmit=e=>{e.preventDefault();sendChat($("#chatInput").value);$("#chatInput").value="";};document.querySelectorAll(".chat-suggestions button").forEach(b=>b.onclick=()=>sendChat(b.dataset.question));
