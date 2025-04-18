# Prompt Engineering

## 기본 개념과 그 목표
* AI 모델을 원하는 형태로 조정하고 제어할 수 있도록 하기 위함입니다.
* 과거에는 AI 모델은 별도의 훈련을 통해서만 원하는 형태로 조절할 수 있고 제어할 수 있었습니다.
* 하지만 AI 모델의 크기가 커지면서 모델에 주는 입력 만으로도 이를 제어할 수 있게 되었습니다.
* 전문적인 용어로 [In-Context Learning](https://velog.io/@dongyoungkim/GPT-fine-tuning-5.-in-context-learning) 이라고 부릅니다.

## 출력 시점의 파라미터 조절하기
![images](https://cdn.analyticsvidhya.com/wp-content/uploads/2024/10/info-update1-copy.webp)
* 모델의 출력을 제어할 수 있는 여러 가지 방법이 있는데, 그 중에 의미가 있는 것이 바로 출력 시점의 파라미터를 조절하는 것입니다.
* 주요한 파라미터 이름들
  * `max_tokens`
  * `temperature`
  * `top_p`
  * `top_k`
  * `frequency_penalty`
  * `presence_penalty`
  * `stop` or `stop_sequences`
* Structured Output (구조화된 출력)
  * LLM 모델의 아웃풋을 특정하게 그 포맷과 스타일을 강제할 수 있습니다. [참고](https://www.magicaiprompts.com/blog/gpt-structured-output)
  * 예를 들어 JSON, XML, 혹은 그 아웃풋이 숫자이거나 해야 하는 경우가 있겠지요? 이럴 때 사용합니다.
  * OpenAI: https://platform.openai.com/docs/guides/structured-outputs?api-mode=responses
  * Gemini: https://ai.google.dev/gemini-api/docs/structured-output

## 여러 가지 프롬프팅 기법들
![images](https://www.promptingguide.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcot.1933d9fe.png&w=1080&q=75)
* https://www.promptingguide.ai/ 를 참고하여 나만의 프롬프팅 기법을 찾아보세요.
  * Chain of Thoughts가 무엇인지 살펴봅시다.
* 공식 프롬프팅 가이드: 좋은 프롬프트는 모델 마다 서로 다릅니다.
  * OpenAI: https://cookbook.openai.com/examples/gpt4-1_prompting_guide
  * Gemini: https://services.google.com/fh/files/misc/gemini-for-google-workspace-prompting-guide-101.pdf
  * Claude: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview

```
계획(Planning) [선택 사항]: 원하는 경우, 모델이 단순히 도구 호출만 연쇄적으로 수행하는 대신, 각 도구 호출 전에 텍스트로 명시적인 계획을 세우고 결과를 성찰하도록 합니다. 저희 예시는 다음과 같습니다:
각 함수 호출 전에 반드시 상세하게 계획을 세우고 (MUST plan extensively), 이전 함수 호출 결과에 대해 상세하게 성찰해야 합니다 (reflect extensively).
함수 호출만으로 전체 프로세스를 수행하지 마세요 (DO NOT do this entire process by making function calls only). 이는 문제 해결 능력과 통찰력 있는 사고를 저해할 수 있습니다.
```

## 바로 테스트하기 
* https://aistudio.google.com/
* https://platform.openai.com/playground/prompts
  * https://www.youtube.com/watch?v=iwYtzPJELkk