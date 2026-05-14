export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scores, answers } = req.body;

  const scoreText = scores.map(s => `${s.label}: ${s.score}점 (${s.grade})`).join('\n');

  const prompt = `당신은 웰니스 전문가입니다. 아래는 한 사람의 웰니스 자가 점검 결과입니다.

${scoreText}

이 결과를 바탕으로 아래 JSON 형식으로만 응답해주세요. 마크다운이나 추가 텍스트 없이 JSON만 출력하세요.

{
  "summary": "전체 결과에 대한 따뜻하고 공감 어린 총평 2~3문장 (한국어, 20대에게 친근한 말투로)",
  "advice": "가장 낮은 점수 영역을 중심으로 한 구체적이고 실천 가능한 조언 2~3문장 (한국어, 부담스럽지 않은 톤)",
  "quote": "이 사람에게 딱 맞는 명언 또는 좋은 글귀 (한국어 또는 영어, 출처 포함)",
  "message": "이 사람에게 전하는 따뜻한 한마디 한 문장 (한국어, ✦ 이모지 포함)"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    // JSON 파싱
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    return res.status(200).json(result);
  } catch (err) {
    console.error('AI analysis error:', err);
    return res.status(500).json({ error: 'AI 분석 중 오류가 발생했습니다.' });
  }
}
