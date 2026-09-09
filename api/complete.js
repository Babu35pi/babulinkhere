export default async function handler(req,res){
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
if(req.method==='OPTIONS')return res.status(200).end();
try{
const {paymentId,txid}=req.body;
const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{
method:'POST',
headers:{'Authorization':`Key ${process.env.PI_API_KEY}`,'Content-Type':'application/json'},
body:JSON.stringify({txid})
});
const d=await r.text();
if(!r.ok)return res.status(500).json({error:d});
console.log(`EXCHANGE ${paymentId} ${txid} -> Send UGX`);
return res.status(200).json({success:true,txid});
}catch(e){return res.status(500).json({error:e.message})}
}
