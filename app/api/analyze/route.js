import { NextResponse } from 'next/server'

// Simple deterministic analyzer used when GEMINI_API_KEY is not configured.
function deterministicAnalysis(message){
  const sentences = message.split(/[\.\n]+/).map(s=>s.trim()).filter(Boolean)
  const summary = sentences.slice(0,2).join('. ') + (sentences.length>2?'.':'')
  const objectives = sentences.filter(s=>/goal|objective|aim|should|allow|enable|provide|let/i.test(s)).slice(0,5)
  const targetUsers = []
  if(/customer|user|client|admin|staff|manager/i.test(message)){
    if(/customer|client|user/i.test(message)) targetUsers.push('End users / customers')
    if(/admin|staff|manager/i.test(message)) targetUsers.push('Internal admins or staff')
  }
  if(targetUsers.length===0) targetUsers.push('Not specified')

  const requirements = sentences.filter(s=>/must|should|allow|require|feature|able to|can /i.test(s)).slice(0,8).map((s,i)=>({id:'r_'+i,title:s.slice(0,80),description:s,sourceText:s}))
  // Ambiguities: short questions or areas where message lacks specifics
  const ambiguities = []
  if(!/payment|pay|pricing/i.test(message)) ambiguities.push({id:'a_1',title:'Payments not specified',description:'No payment provider or flow was mentioned.'})
  if(!/auth|sign in|signup|register|login/i.test(message)) ambiguities.push({id:'a_2',title:'Authentication',description:'Authentication requirements (signup, SSO) were not specified.'})

  const risks = []
  if(/booking|appointment|availability/i.test(message)) risks.push({id:'risk_1',title:'Scheduling complexity',description:'Booking and availability rules may introduce edge cases.'})
  if(message.length<100) risks.push({id:'risk_2',title:'Insufficient detail',description:'Client message is brief and may omit important requirements.'})

  const assumptions = []
  if(/customers|users/i.test(message)) assumptions.push({id:'as_1',title:'Users are consumer-facing',description:'Assuming end users are consumers using a web interface.'})
  if(assumptions.length===0) assumptions.push({id:'as__default',title:'No major assumptions detected',description:'No clear assumptions could be inferred.'})

  const dependencies = []
  if(/calendar|google calendar|stripe|payment/i.test(message)) dependencies.push({id:'d_1',title:'External integrations',description:'Client may require external services (payments, calendar).'})
  if(dependencies.length===0) dependencies.push({id:'d_default',title:'No explicit dependencies',description:'No external integrations were specified.'})

  // Simple complexity/readiness heuristics
  const reqCount = requirements.length
  let complexity = 'Low'
  if(reqCount>5 || ambiguities.length>2 || risks.length>1) complexity = 'Medium'
  if(reqCount>10 || ambiguities.length>4 || risks.length>2) complexity = 'High'

  let readiness = 100
  readiness -= ambiguities.length * 20
  readiness -= Math.min(30, (10 - reqCount) * 2)
  readiness = Math.max(10, readiness)

  return {
    summary: summary || 'No clear summary could be generated.',
    objectives: objectives.length? objectives: ['Not explicitly stated'],
    targetUsers,
    requirements,
    ambiguities,
    risks,
    assumptions,
    dependencies,
    complexity,
    readiness
  }
}

export async function POST(req){
  try{
    const body = await req.json()
    const { id, clientMessage } = body || {}
    if(!id || !clientMessage) return NextResponse.json({error:'Missing id or clientMessage'}, {status:400})

    // If GEMINI_API_KEY exists, this is where you'd call the real AI. For the hackathon we provide deterministic output.
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
    let analysis
    if(key){
      // Placeholder: in a real build you would call Gemini here.
      analysis = deterministicAnalysis(clientMessage)
      analysis._note = 'Used deterministic analyzer despite key present (placeholder).'
    } else {
      analysis = deterministicAnalysis(clientMessage)
      analysis._note = 'Deterministic analyzer (no GEMINI_API_KEY configured).'
    }

    return NextResponse.json({ok:true,analysis})
  }catch(err){
    console.error('Analyze error',err)
    return NextResponse.json({error:'Internal server error'}, {status:500})
  }
}
