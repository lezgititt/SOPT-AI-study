# BASIC LLM

## 기본 개념
* LLM의 기본적인 구조와 그 개념, 용어에 대해 이해합니다.
* 전문적인 이론 지식을 얻는 것이 목적이 아닙니다. 대신, 실용적인 내용으로 개념을 이해합니다.

## 트랜스포머 아키텍처
![transformers](https://wikidocs.net/images/page/31379/transformer_attention_overview.PNG)
* 트랜스포머는 주어진 텍스트를 하나의 벡터 표현으로 만듭니다.
  * 여기서 말하는 벡터 표현 은, 소수점이 있는 숫자들의 모음/집합 이라고 보시면 됩니다.
  * 왜 벡터 표현으로 만들어야 할까요? [블로그](https://developer-wh.tistory.com/entry/AI%EC%97%90%EC%84%9C-%EB%B2%A1%ED%84%B0%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)

![encoder_decoder](https://velog.velcdn.com/images%2Fcha-suyeon%2Fpost%2Ffb6ff671-8dde-43e2-bfb8-d46c1215d8e5%2Fimage.png)
* 트랜스포머는 인코더-디코더 구조로 이루어져 있습니다.
  * 인코더는 텍스트가 주어지면 이를 벡터 표현으로 바꾸는 일을 합니다.
  * 디코더는 벡터 표현이 주어지면 이를 텍스트로 바꾸는 일을 합니다.
  * LLM은 인코더를 통해 벡터 표현으로 바꾼 다음, 디코더를 여러 층을 통과하여 최종 답변을 만들어 냅니다.

![attention](https://blog.kakaocdn.net/dn/dpU0Vu/btqCgQ0OkMG/EIEGd3xjvQaKfL3NJycww0/img.png)
* 트랜스포머는 Attention 이라는 방법으로 문장 속의 각 단어를 파악합니다. 
* 마치 수업 중 선생님이 “여기 중요한 부분이야!” 하며 칠판의 특정 내용을 가리키듯, 어텐션은 모델이 문장 속에서 ‘지금 주목해야 할 단어’를 골라내는 역할을 합니다.
 * 질문(Query): “이 단어가 다른 단어와 얼마나 관련 있을까?”라는 질문을 던집니다. 
 * 단서(Key): 문장 속 모든 단어가 가진 특징표(Key)라고 생각하면 됩니다. 
 * 정답(Value): 실제로 전달할 정보(Value)로, “이 단어가 말하는 의미”에 해당합니다.
 * 모델은 각 질문(Query)과 단서(Key)를 비교해서 “이 정도 중요해!”라는 가중치(점수)를 매기고, 그 가중치로 정답(Value)을 골고루 섞어 최종 출력을 만듭니다.

## LLM 의 구조 살펴보기
* LLM에서 가장 중요한 것은? 인퍼런스 시의 성능과 속도!
  * Inference: AI 모델의 답변을 만드는 행위를 뜻하는 용어.
  * 성능 지표를 보기 위하여 알아야 하는 것들
    * 파라미터 (Parameters): 보통 파라미터가 높으면 성능이 높다. GPT-4 계얼은 1 Trillion 의 파라미터를 가지고 있다.
    * 주요한 파라미터는 3B, 8B, 12B, 70B, ... 가 있다. 보통 파라미터가 높아지면 속도가 낮아진다.
    * 여러 모델을 동시에 띄워두고 적당하게 어디로 가면 좋을지 판단하기도 한다. 이를 MoE (Mixture of Experts) 라고 부른다.
  * LLM이 받을 수 있는 Long Context는 어느 정도일까요? 모델 별로 얼마나의 차이가 있을까요?
    * Long Context를 받을 수 있다고 해서 정말 그것을 잘 이해할 수 있을까요?
    * 사람도 긴 텍스트를 주어지면 세세하게 꼼꼼하게 보는 능력이 떨어집니다. 이는 LLM도 동일 합니다.
    * 건초 더미 속 바늘 찾기 (Needle in the haystack) https://velog.io/@lhj/%EB%85%BC%EB%AC%B8-%EB%A6%AC%EB%B7%B0-NeedleBench-Can-LLMs-Do-Retrieval-and-Reasoning-in-1-Million-Context-Window
* 벤치마크를 통해 성능을 살펴봅시다.
  * https://livebench.ai/#/
  * https://lk.instruct.kr/
  * https://github.com/THUDM/LongBench
* 허깅페이스와 OpenRouter 를 방문 해보자.
  * https://huggingface.co/models
  * https://openrouter.ai/
* 비용에 대해서도 알아봅시다. AI 모델은 어떤 것을 기준으로 비용을 받을까요?
  * 단어 수를 기준으로 받습니다. 하지만 단어 수를 단순하게 사용하지 않고, 조금 더 효율적으로 사용합니다.
  * 이를 토큰 (Token) 이라고 부릅니다. https://www.sisain.co.kr/news/articleView.html?idxno=54418
  * 각 모델은 서로 다른 토큰 계산기를 가지고 있습니다. 이 토큰 계산기를 토크나이저 (Tokenizer) 라고 부릅니다. https://makenow90.tistory.com/59
  * 한국어에 최적화된 토큰 계산기 를 가진 모델은 무엇일까요? https://huggingface.co/spaces/Xenova/the-tokenizer-playground
  * 각 모델의 토큰 당 과금 정책은 어떻게 될까요? 한 번 살펴봅시다.

## 추천 자료
* [OpenAI 정형원 박사 Stanford 강의](https://www.youtube.com/watch?v=kYWUEV_e2ss)
* [어텐션 알아보기](https://modulabs.co.kr/blog/introducing-attention)
* [어텐션 Velog](https://velog.io/@jhbale11/%EC%96%B4%ED%85%90%EC%85%98-%EB%A7%A4%EC%BB%A4%EB%8B%88%EC%A6%98Attention-Mechanism%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
* [밑바닥부터 이해하는 어텐션](https://glee1228.tistory.com/3)
* [사이오닉 MoE](https://blog.sionic.ai/llm-moe)
* [Mistral MoE](https://4n3mone.tistory.com/10)