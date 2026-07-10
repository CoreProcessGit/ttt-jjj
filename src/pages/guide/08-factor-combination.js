import React from 'react';
import { Link } from 'react-router-dom';
import ScreenshotSlot from './ScreenshotSlot';
import img01 from '../../assets/user_guide/08-factor/01.png';
import img02 from '../../assets/user_guide/08-factor/02.png';
import img03 from '../../assets/user_guide/08-factor/03.png';
import img04 from '../../assets/user_guide/08-factor/04.png';

const FactorCombination = () => (
  <article className="guide-article">
    <h1>08. Factor Combination — 페어와이즈 조합 테스트 자동 생성</h1>
    <p className="guide-lead">
      Factor Combination은 T-CAFE만의 차별화 기능으로, 흔히 페어와이즈(Pairwise) 테스트 또는 조합 테스트라고 부르는 기법입니다. 여러 변수(Factor)의 조합을 자동으로 생성해 테스트 케이스를 대량 작성할 수 있으며, 마이크로소프트 PICT 같은 도구가 명령줄에서 하던 계산을 브라우저에서 바로 처리합니다.
    </p>

    <hr />

    <h2>1. Factor Combination이란?</h2>
    <p>테스트해야 할 변수가 여러 개인 시나리오에서, 모든 가능한 조합을 자동으로 만들어주는 기능입니다.</p>

    <h3>사용 사례</h3>
    <ul>
      <li>Cross Browser 테스트: Chrome × Firefox × Safari × Edge 조합</li>
      <li>다국어 테스트: 한국어 × 영어 × 일본어 × 중국어</li>
      <li>권한 테스트: Admin × User × Guest 조합</li>
      <li>OS × 디바이스: Windows × Mac × Linux × iOS × Android</li>
      <li>결제 수단: 신용카드 × 계좌이체 × 가상계좌 × 페이팔</li>
    </ul>

    <h3>왜 자동화가 필요한가?</h3>
    <p>3개 변수가 각각 4개, 3개, 5개의 값을 가지면:</p>
    <ul>
      <li>수동 작성: 4 × 3 × 5 = 60개의 TC를 일일이 작성해야 함</li>
      <li>Factor Combination: 자동으로 60개 생성 + 변경 시 한 번에 갱신</li>
    </ul>

    <hr />

    <h2>2. 기본 개념</h2>
    <table>
      <thead>
        <tr><th>용어</th><th>영문</th><th>설명</th></tr>
      </thead>
      <tbody>
        <tr><td>Factor</td><td>Factor</td><td>변수 (예: Browser, OS, Language)</td></tr>
        <tr><td>Value</td><td>Value</td><td>변수의 값 (예: Chrome, Firefox, Safari)</td></tr>
        <tr><td>Combination</td><td>Combination</td><td>모든 Factor의 값 조합 (예: Chrome+Windows+Korean)</td></tr>
        <tr><td>Constraint</td><td>Constraint</td><td>조합 제약 (예: "Safari는 Windows에서 제외")</td></tr>
        <tr><td>Factor Type</td><td>Type</td><td>각 Factor별로 선택하는 조합 방식 (Full Combination 또는 Pairwise). Factor마다 다른 타입을 섞으면 자동으로 Mixed 방식으로 처리됩니다.</td></tr>
        <tr><td>Simulated TC</td><td>Simulated Test Case</td><td>생성될 TC의 미리보기</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>3. Combination Type (조합 알고리즘)</h2>
    <p>T-CAFE는 3가지 조합 알고리즘을 지원합니다.</p>

    <h3>3-1. Full Combination (전체 조합)</h3>
    <p>모든 가능한 조합을 만듭니다.</p>
    <p>예시: Browser(3) × OS(2) × Language(2) = 12개 조합</p>
    <table>
      <thead>
        <tr><th>Browser</th><th>OS</th><th>Language</th></tr>
      </thead>
      <tbody>
        <tr><td>Chrome</td><td>Windows</td><td>Korean</td></tr>
        <tr><td>Chrome</td><td>Windows</td><td>English</td></tr>
        <tr><td>Chrome</td><td>Mac</td><td>Korean</td></tr>
        <tr><td>Chrome</td><td>Mac</td><td>English</td></tr>
        <tr><td>Firefox</td><td>Windows</td><td>Korean</td></tr>
        <tr><td>Firefox</td><td>Windows</td><td>English</td></tr>
        <tr><td>Firefox</td><td>Mac</td><td>Korean</td></tr>
        <tr><td>Firefox</td><td>Mac</td><td>English</td></tr>
        <tr><td>Safari</td><td>Windows</td><td>Korean</td></tr>
        <tr><td>Safari</td><td>Windows</td><td>English</td></tr>
        <tr><td>Safari</td><td>Mac</td><td>Korean</td></tr>
        <tr><td>Safari</td><td>Mac</td><td>English</td></tr>
      </tbody>
    </table>
    <p>장점: 100% 커버리지<br />단점: 변수가 많으면 폭발적으로 증가</p>

    <h3>3-2. Pairwise Combination (페어와이즈)</h3>
    <aside className="guide-callout info">
      테스트 대상 Factor들 중 아무 2개를 골랐을 때, 그 두 Factor의 각 값들의 모든 조합(pair)이 최소 한 번 이상 등장하도록 테스트 케이스를 구성합니다.
    </aside>
    <p>즉 임의의 두 Factor만 떼서 봐도 그 두 Factor의 모든 값 쌍이 적어도 한 번은 함께 나타납니다. 3개 이상의 Factor가 동시에 만들어내는 특정 조합은 보장하지 않습니다.</p>

    <p>Pairwise는 모든 2-Factor 값 쌍이 포함되도록 자동으로 최적의 조합을 선택합니다.</p>

    <p>예시: Browser(3) × OS(3) × Language(2) → Full은 18개, Pairwise는 약 9개로 축소</p>
    <p>장점: TC 수가 크게 줄어듦 (변수가 많을수록 효과 큼)<br />단점: 3개 이상의 Factor가 동시에 만들어내는 특정 조합은 누락 가능</p>

    <p>자동 fallback:</p>
    <ul>
      <li>Factor가 1개면 → 그 Factor의 값을 그대로 나열</li>
      <li>Factor가 2개면 → Full Combination과 동일 (Pairwise의 정의상 동치)</li>
      <li>Factor가 3개 이상이면 → Pairwise 자동 최적화 적용</li>
    </ul>

    <p>생성 한도 (모든 알고리즘 공통):</p>
    <ul>
      <li>한 번의 Factor Combination 시뮬레이션으로 생성 가능한 최대 테스트 케이스 수는 5000개</li>
      <li>Full / Pairwise / Mixed 알고리즘 종류와 무관하게 동일하게 적용</li>
      <li>5000개를 초과하면 시뮬레이션 단계에서 경고가 표시되고 앞에서부터 5000개만 미리보기로 노출</li>
      <li>5000개에 근접할 정도면 Constraint를 추가하거나 Factor를 분할 권장</li>
    </ul>

    <p>언제 쓰는가:</p>
    <ul>
      <li>회귀 테스트 등 시간이 부족할 때</li>
      <li>변수가 많은데 모든 조합을 다 돌리기 어려울 때</li>
      <li>실증 연구상 단일/페어 조합에서 발견되는 결함의 비중이 큼</li>
    </ul>

    <h3>3-3. Mixed Combination (자동 처리)</h3>
    <aside className="guide-callout info">
      Mixed는 사용자가 직접 선택하는 옵션이 아니라, Factor별로 서로 다른 타입을 지정했을 때 시뮬레이션 시 자동으로 적용되는 방식입니다.
    </aside>
    <p>여러 Factor 중 일부는 Full Combination, 일부는 Pairwise로 타입을 지정하면, T-CAFE는 Full 타입 Factor들의 모든 조합을 기준으로 Pairwise 타입 Factor의 값을 골고루 배분합니다.</p>
    <p>예시: Browser / OS를 Full로, Language를 Pairwise로 지정 → Browser × OS 모든 조합이 유지되면서 Language 값이 순환 배분</p>

    <hr />

    <h2>4. Constraint (조합 제약)</h2>
    <p>현실에서는 모든 조합이 의미 있지 않습니다. Constraint로 불가능하거나 불필요한 조합을 제외할 수 있습니다.</p>

    <h3>Constraint 종류 (3가지)</h3>
    <table>
      <thead>
        <tr><th>UI 라벨</th><th>의미</th><th>사용 예시</th></tr>
      </thead>
      <tbody>
        <tr><td>If-Then</td><td>특정 조건이 충족되면 다른 Factor가 특정 값이어야 함</td><td>"Browser=Safari일 때 OS는 Mac"</td></tr>
        <tr><td>One-Way Exclude</td><td>한 쪽 조건이 참일 때 특정 조합을 제외 (단방향)</td><td>"OS=Windows일 때 Browser=Safari 제외"</td></tr>
        <tr><td>Two-Way Exclude</td><td>지정한 두 값이 절대 함께 등장하지 못하도록 양방향으로 제외</td><td>"Browser=Safari와 OS=Windows 조합 제외"</td></tr>
      </tbody>
    </table>

    <h3>예시 — "Safari는 Windows에서 동작하지 않음"</h3>
    <ul>
      <li>One-Way Exclude: OS=Windows ➜ Browser=Safari 제외</li>
      <li>Two-Way Exclude: Browser=Safari 와 OS=Windows 를 함께 등장 불가로 지정</li>
    </ul>
    <p>→ 두 방식 모두 "Safari + Windows" 조합이 시뮬레이션 결과에서 제외됩니다.</p>

    <hr />

    <h2>5. Factor Combination 생성 절차</h2>
    <aside className="guide-callout">권한 필요: Admin 또는 Team Admin</aside>

    <h3>화면 구조 안내</h3>
    <p>Factor Combination 화면은 상단에 3개의 탭이 있으며 순서대로 작업을 진행합니다:</p>
    <ol>
      <li>Simulation 탭 — Factor / Constraint 정의 및 시뮬레이션</li>
      <li>Details 탭 — 모든 조합 TC에 공통 적용할 속성 입력 (Priority, Case Type, Owner 등)</li>
      <li>Steps &amp; Test Data 탭 — 각 조합별로 수행할 스텝 매트릭스 정의</li>
    </ol>

    <h3>Step 1: 폴더 선택</h3>
    <ol>
      <li>Test Cases 페이지에서 Factor Combination을 만들 폴더 선택 (없으면 먼저 New Folder로 생성)</li>
    </ol>
    <aside className="guide-callout info">
      Factor Combination 설정 표시: Factor Combination을 한 번이라도 저장한 폴더는 좌측 폴더 트리에서 폴더명 옆에 주황색 ⚡ 아이콘이 표시됩니다. 어느 폴더에 설계 내역이 있는지 한눈에 확인할 수 있어, 같은 폴더에 다시 들어가서 수정하거나 새 폴더에 새 설계를 만들지 빠르게 판단할 수 있습니다. 부모 폴더에는 전파되지 않으며 그 폴더 자체에 설정이 있을 때만 표시됩니다.
    </aside>

    <h3>Step 2: Factor Combination 생성 시작</h3>
    <ol>
      <li>상단의 + Create Test Case 버튼 클릭</li>
      <li>드롭다운 메뉴에서 Factor Combination 선택</li>
      <li>Factor Combination 작성 화면(Simulation 탭)이 열립니다</li>
    </ol>

    <ScreenshotSlot label="Factor Combination 시작 화면" src={img01} />

    <h3>Step 3: Factor 정의 (Simulation 탭)</h3>
    <ol>
      <li>+ Add Factor 클릭</li>
      <li>Factor 이름 입력 (예: "Browser")</li>
      <li>Factor 타입 선택 — Full Combination 또는 Pairwise</li>
      <li>Values 추가: 각 값을 입력 (예: Chrome, Firefox, Safari)</li>
      <li>필요한 만큼 Factor 추가 반복</li>
    </ol>

    <ScreenshotSlot label="Factor 정의 화면" src={img02} />

    <h3>Step 4: Constraint 추가 (선택, Simulation 탭)</h3>
    <ol>
      <li>+ Add Constraint 클릭</li>
      <li>Constraint Type 선택: If-Then / One-Way Exclude / Two-Way Exclude</li>
      <li>Factor 1 드롭다운에서 Factor 선택 → Value 1 드롭다운에서 값 선택</li>
      <li>Factor 2 드롭다운에서 Factor 선택 → Value 2 드롭다운에서 값 선택</li>
      <li>Add Constraint 버튼으로 저장</li>
    </ol>
    <aside className="guide-callout info">
      3 가지 Constraint Type 모두 동일한 플로우입니다. Factor 1 / Value 1 / Factor 2 / Value 2 를 선택한 뒤 바로 Add Constraint 를 누르면 추가됩니다. 별도의 "Add Value" 중간 단계는 없습니다.
    </aside>
    <p>타입별 의미:</p>
    <ul>
      <li>If-Then: Factor 1 = Value 1 이면 Factor 2 = Value 2 여야 함 (조건부 연결)</li>
      <li>One-Way Exclude: Factor 1 = Value 1 일 때 Factor 2 = Value 2 조합을 제외 (단방향)</li>
      <li>Two-Way Exclude: Factor 1 = Value 1 과 Factor 2 = Value 2 가 함께 등장하는 조합을 양방향으로 제외</li>
    </ul>

    <h3>Step 5: 시뮬레이션 (Simulation 탭)</h3>
    <ol>
      <li>Simulate 버튼 클릭</li>
      <li>생성될 조합 목록이 미리보기로 표시됨 (최대 5,000개까지, 초과 시 경고)</li>
      <li>결과가 마음에 들지 않으면 Factor 또는 Constraint 조정 후 다시 Simulate</li>
    </ol>

    <ScreenshotSlot label="Simulation 결과" src={img03} />

    <h3>Step 6: 공통 속성 입력 (Details 탭)</h3>
    <ol>
      <li>상단의 Details 탭 클릭</li>
      <li>모든 조합 TC에 공통 적용할 항목 입력 (Description, Priority, Owner, Components, Labels, Case Type, UDF 등)</li>
      <li>Apply 버튼 클릭 — 공통 정보가 저장되고 이후 TC 생성에 반영됩니다</li>
    </ol>

    <aside className="guide-callout info">
      Details 정보를 저장하지 않으면 TC 생성 시 "Please save Details information first" 경고가 표시되어 진행할 수 없습니다.
    </aside>

    <h3>Step 7: 스텝 매트릭스 정의 (Steps &amp; Test Data 탭, 선택)</h3>
    <ol>
      <li>상단의 Steps &amp; Test Data 탭 클릭</li>
      <li>테스트 스텝(행)과 각 조합(열)로 이루어진 매트릭스에서 조합별 적용 여부와 Test Data 입력</li>
      <li>자세한 사용법은 아래 §8 Steps Matrix 참고</li>
    </ol>

    <h3>Step 8: TC 생성</h3>
    <ol>
      <li>화면 우상단의 Create Test Case 버튼 클릭</li>
      <li>시뮬레이션된 각 조합에 대해 TC가 자동 생성됩니다</li>
      <li>TC 이름은 자동으로 "<code>폴더명-Factor값1-Factor값2-…</code>" 형식 부여 (예: "Cross Browser-Chrome-Desktop-Login")</li>
      <li>생성된 TC는 목록에서 F 배지(Factor 타입)로 표시됨</li>
    </ol>

    <hr />

    <h2>6. 생성된 TC의 특징</h2>

    <h3>자동 부여 항목</h3>
    <ul>
      <li>이름: 폴더명 + 각 Factor 값을 조합한 형식</li>
      <li>TC 키: 자동 부여 (예: PROJ-15, PROJ-16...)</li>
      <li>Factor Values: 어떤 조합인지 메타데이터로 저장</li>
      <li>Factor Signature: 조합을 유일하게 식별하는 키</li>
      <li>테스트 스텝: 기본 템플릿 + 각 Factor 값이 자동 삽입됨</li>
    </ul>

    <h3>공통 정보 (Assignment Statistics)</h3>
    <p>모든 조합 TC에 동일하게 적용되는 정보:</p>
    <ul>
      <li>우선순위 (Priority)</li>
      <li>케이스 타입 (Case Type)</li>
      <li>컴포넌트 (Components)</li>
      <li>라벨 (Labels)</li>
      <li>소유자 (Owner)</li>
      <li>UDF (User Defined Fields)</li>
    </ul>
    <p>이 정보들은 Factor Combination 생성 시 한 번만 입력하면 모든 조합 TC에 자동 적용됩니다.</p>

    <hr />

    <h2>7. Factor TC / Factor Combination 수정</h2>
    <aside className="guide-callout">권한 필요: Admin 또는 Team Admin</aside>

    <h3>개별 Factor TC 속성 수정</h3>
    <p>생성된 각 Factor TC는 Single TC처럼 개별적으로 열어서 속성을 수정할 수 있습니다.</p>
    <ol>
      <li>TC 목록에서 편집할 Factor TC의 Key 또는 이름 클릭</li>
      <li>편집 페이지에서 이름 · Description · Precondition · 테스트 스텝 · UDF 등을 직접 수정</li>
      <li>저장</li>
    </ol>
    <p>편집 페이지는 Single TC의 편집 화면과 동일한 UI를 사용합니다. Factor 메타데이터(어떤 조합인지)는 읽기 전용으로 표시됩니다.</p>

    <h3>Factor Combination 구조(Factor/Value/Constraint) 재편집</h3>
    <p>Factor Combination의 구조 자체(Factor 추가·삭제, Value 변경, Constraint 수정)를 바꾸는 경우 해당 폴더의 Factor Combination 작업 화면을 다시 열어 Simulation 탭에서 조정합니다. Details/Steps &amp; Test Data 탭도 순차적으로 갱신하여 Apply / Create Test Case로 재생성합니다.</p>

    <aside className="guide-callout info">
      Factor Combination 구조를 크게 변경하면 이미 생성된 TC가 예상과 달라질 수 있으므로, 기존 TC 삭제 후 새로 생성하는 것을 권장합니다. 실행 이력이 있는 TP에 추가된 TC는 스냅샷으로 복사되어 있어 구조 변경의 영향을 받지 않습니다.
    </aside>

    <hr />

    <h2>8. Steps Matrix (스텝 매트릭스)</h2>
    <p>Factor Combination에서는 각 조합별로 다른 스텝을 정의할 수 있습니다.</p>

    <h3>Steps Matrix 화면</h3>
    <ul>
      <li>행: 테스트 스텝 (Step 1, 2, 3...)</li>
      <li>열: 각 조합 TC</li>
    </ul>

    <h3>사용법</h3>
    <ol>
      <li>공통 스텝은 모든 조합에서 체크</li>
      <li>특정 조합에만 적용되는 스텝은 해당 열만 체크</li>
      <li>예: "Mac에서만 추가 권한 확인" 스텝은 Mac 조합에만 체크</li>
    </ol>

    <ScreenshotSlot label="Steps Matrix" src={img04} />

    <hr />

    <h2>9. 실제 예시 — Cross Browser 테스트</h2>

    <h3>시나리오</h3>
    <p>웹 애플리케이션의 로그인 기능을 다양한 환경에서 테스트</p>

    <h3>Factor 정의</h3>
    <table>
      <thead>
        <tr><th>Factor</th><th>Values</th></tr>
      </thead>
      <tbody>
        <tr><td>Browser</td><td>Chrome, Firefox, Safari</td></tr>
        <tr><td>Device</td><td>Desktop, Mobile</td></tr>
        <tr><td>Feature</td><td>Login</td></tr>
      </tbody>
    </table>

    <h3>Constraint</h3>
    <p>없음 (모든 조합 의미 있음)</p>

    <h3>Simulation 결과</h3>
    <p>3 × 2 × 1 = 6개 조합</p>
    <table>
      <thead>
        <tr><th>#</th><th>Browser</th><th>Device</th><th>Feature</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Chrome</td><td>Desktop</td><td>Login</td></tr>
        <tr><td>2</td><td>Chrome</td><td>Mobile</td><td>Login</td></tr>
        <tr><td>3</td><td>Firefox</td><td>Desktop</td><td>Login</td></tr>
        <tr><td>4</td><td>Firefox</td><td>Mobile</td><td>Login</td></tr>
        <tr><td>5</td><td>Safari</td><td>Desktop</td><td>Login</td></tr>
        <tr><td>6</td><td>Safari</td><td>Mobile</td><td>Login</td></tr>
      </tbody>
    </table>

    <h3>자동 생성된 TC 이름</h3>
    <ul>
      <li>Cross Browser-Chrome-Desktop-Login</li>
      <li>Cross Browser-Chrome-Mobile-Login</li>
      <li>Cross Browser-Firefox-Desktop-Login</li>
      <li>Cross Browser-Firefox-Mobile-Login</li>
      <li>Cross Browser-Safari-Desktop-Login</li>
      <li>Cross Browser-Safari-Mobile-Login</li>
    </ul>

    <h3>공통 스텝</h3>
    <ol>
      <li>해당 환경에서 애플리케이션 열기</li>
      <li>로그인 기능 테스트</li>
      <li>UI 렌더링 확인</li>
    </ol>

    <p>각 조합은 같은 스텝을 사용하지만, 테스트 데이터는 환경별로 다르게 표시됩니다.</p>

    <hr />

    <h2>10. 베스트 프랙티스</h2>

    <h3>DO</h3>
    <ul>
      <li>명확한 Factor 이름: "Browser", "OS"처럼 자체 설명적</li>
      <li>현실적인 Values: 실제 지원하는 항목만 (Safari를 Windows에 넣지 말기)</li>
      <li>Pairwise를 적극 활용: 변수가 4개 이상이면 Pairwise 권장</li>
      <li>Constraint 적극 사용: 불가능한 조합 미리 제거</li>
      <li>시뮬레이션 후 생성: 무작정 생성하지 말고 미리보기 확인</li>
    </ul>

    <h3>DON'T</h3>
    <ul>
      <li>너무 많은 Factor (10개 이상은 관리 불가)</li>
      <li>너무 많은 Values per Factor (각 Factor당 5~7개 권장)</li>
      <li>Constraint 없는 비현실적 조합 양산</li>
      <li>Steps Matrix를 무시한 단조로운 스텝</li>
    </ul>

    <hr />

    <h2>11. Factor TC와 일반 TC의 차이</h2>
    <table>
      <thead>
        <tr><th>항목</th><th>Single TC</th><th>Factor TC</th></tr>
      </thead>
      <tbody>
        <tr><td>생성 방식</td><td>수동 입력</td><td>Factor Combination 시뮬레이션으로 일괄 자동 생성</td></tr>
        <tr><td>TC 키</td><td>자동 부여</td><td>자동 부여</td></tr>
        <tr><td>이름</td><td>사용자 입력</td><td>폴더명 + 각 Factor 값을 "-"로 연결한 형식 자동 부여</td></tr>
        <tr><td>수정 가능 항목</td><td>모든 일반 속성</td><td>이름·Description·스텝·UDF 등 일반 속성 수정 가능. Factor 메타데이터(조합 값)는 읽기 전용</td></tr>
        <tr><td>폴더 이동</td><td>자유롭게 이동</td><td>개별 TC 단위로 자유 이동 (folder_id만 변경). Factor Combination 정의는 원래 폴더에 남음</td></tr>
        <tr><td>목록 표시</td><td>S 배지</td><td>F 배지</td></tr>
        <tr><td>삭제</td><td>개별 삭제</td><td>개별 삭제 가능. 원본 Factor Combination 정의(factor_combinations 레코드)는 폴더가 삭제되기 전까지 유지</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>12. 자주 발생하는 문제</h2>
    <table>
      <thead>
        <tr><th>문제</th><th>원인</th><th>해결</th></tr>
      </thead>
      <tbody>
        <tr><td>+ Create Test Case 드롭다운에 Factor Combination이 안 보임</td><td>권한 없음 (canEditTC 필요)</td><td>Admin/Team Admin 권한 확인</td></tr>
        <tr><td>Simulation 결과가 너무 많음 / 5,000개 초과</td><td>Factor 수·값이 지나치게 많거나 Constraint 부족</td><td>Pairwise로 전환 또는 Constraint 추가, Factor 분할</td></tr>
        <tr><td>생성 후 일부 조합이 누락됨</td><td>Constraint가 과하게 제약</td><td>Constraint 재검토</td></tr>
        <tr><td>"Please save Details information first" 경고</td><td>Details 탭의 Apply 버튼을 누르지 않음</td><td>Details 탭 → 필수 항목 입력 → Apply 클릭 후 재시도</td></tr>
        <tr><td>Factor 이름 중복 에러</td><td>같은 이름의 Factor 두 개</td><td>Factor 이름 변경</td></tr>
        <tr><td>한글 Factor가 깨짐</td><td>인코딩 문제</td><td>UTF-8 확인</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>13. 통계 — 왜 Pairwise가 효과적인가?</h2>
    <p>연구에 따르면:</p>
    <ul>
      <li>단일 변수에서 발생하는 버그: 약 35%</li>
      <li>두 변수 조합에서 발생하는 버그: 약 40%</li>
      <li>세 변수 조합에서 발생하는 버그: 약 15%</li>
      <li>네 변수 이상: 약 10%</li>
    </ul>
    <p>→ Pairwise는 약 75%의 버그를 발견할 수 있고, TC 수는 Full Combination 대비 50~80% 감소</p>
    <p>(출처: NIST의 결합형 테스트(Combinatorial Testing) 연구 및 여러 산업 결함 데이터 분석 — NIST SP 500-267 등 참조)</p>

    <hr />

    <h2>다음 단계</h2>
    <ul>
      <li><Link to="/support/guide/test-cases">05. 테스트 케이스 기본 사용법</Link></li>
      <li><Link to="/support/guide/test-plans">10. 테스트 플랜 관리</Link> — 생성된 Factor TC를 TP에 추가하기</li>
      <li><Link to="/support/guide/configuration">13. Configuration</Link> — Components, Case Types 미리 설정</li>
    </ul>
  </article>
);

const FactorCombinationEn = () => (
  <article className="guide-article">
    <h1>08. Factor Combination — Pairwise Combinatorial Test Generation</h1>
    <p className="guide-lead">
      Factor Combination is T-CAFE's distinctive feature — what's commonly called pairwise or combinatorial testing. Automatically generate combinations of multiple variables (Factors) to bulk-create test cases, running the same computation that command-line tools like Microsoft PICT perform, right in your browser.
    </p>

    <hr />

    <h2>1. What is Factor Combination?</h2>
    <p>For scenarios with many variables to test, it is the feature that automatically builds every meaningful combination.</p>

    <h3>Use Cases</h3>
    <ul>
      <li>Cross-browser testing: Chrome × Firefox × Safari × Edge</li>
      <li>Multilingual testing: Korean × English × Japanese × Chinese</li>
      <li>Permission testing: Admin × User × Guest</li>
      <li>OS × device: Windows × Mac × Linux × iOS × Android</li>
      <li>Payment methods: credit card × bank transfer × virtual account × PayPal</li>
    </ul>

    <h3>Why Automate It?</h3>
    <p>If three variables have 4, 3, and 5 values respectively:</p>
    <ul>
      <li>Manual authoring: you'd have to write 4 × 3 × 5 = 60 TCs by hand</li>
      <li>Factor Combination: 60 TCs auto-generated, and refreshed in one shot when anything changes</li>
    </ul>

    <hr />

    <h2>2. Concepts</h2>
    <table>
      <thead>
        <tr><th>Term</th><th>Key</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Factor</td><td>Factor</td><td>Variable (e.g., Browser, OS, Language)</td></tr>
        <tr><td>Value</td><td>Value</td><td>Value of a variable (e.g., Chrome, Firefox, Safari)</td></tr>
        <tr><td>Combination</td><td>Combination</td><td>A combination of values from all Factors (e.g., Chrome + Windows + Korean)</td></tr>
        <tr><td>Constraint</td><td>Constraint</td><td>A combination constraint (e.g., "Exclude Safari on Windows")</td></tr>
        <tr><td>Factor Type</td><td>Type</td><td>Combination mode chosen per Factor (Full Combination or Pairwise). When different Factors use different types, the system automatically switches to Mixed.</td></tr>
        <tr><td>Simulated TC</td><td>Simulated Test Case</td><td>A preview of the TC that will be created</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>3. Combination Type</h2>
    <p>T-CAFE supports three combination algorithms.</p>

    <h3>3-1. Full Combination</h3>
    <p>Generates every possible combination.</p>
    <p>Example: Browser (3) × OS (2) × Language (2) = 12 combinations</p>
    <table>
      <thead>
        <tr><th>Browser</th><th>OS</th><th>Language</th></tr>
      </thead>
      <tbody>
        <tr><td>Chrome</td><td>Windows</td><td>Korean</td></tr>
        <tr><td>Chrome</td><td>Windows</td><td>English</td></tr>
        <tr><td>Chrome</td><td>Mac</td><td>Korean</td></tr>
        <tr><td>Chrome</td><td>Mac</td><td>English</td></tr>
        <tr><td>Firefox</td><td>Windows</td><td>Korean</td></tr>
        <tr><td>Firefox</td><td>Windows</td><td>English</td></tr>
        <tr><td>Firefox</td><td>Mac</td><td>Korean</td></tr>
        <tr><td>Firefox</td><td>Mac</td><td>English</td></tr>
        <tr><td>Safari</td><td>Windows</td><td>Korean</td></tr>
        <tr><td>Safari</td><td>Windows</td><td>English</td></tr>
        <tr><td>Safari</td><td>Mac</td><td>Korean</td></tr>
        <tr><td>Safari</td><td>Mac</td><td>English</td></tr>
      </tbody>
    </table>
    <p>Pro: 100% coverage<br />Con: explodes with many variables</p>

    <h3>3-2. Pairwise Combination</h3>
    <aside className="guide-callout info">
      Test cases are composed so that when any two Factors are chosen, every pair of values from those two Factors appears at least once.
    </aside>
    <p>Even when you isolate any two Factors from the set, every pair of their values will have co-occurred at least once. Specific combinations formed by 3+ Factors simultaneously are not guaranteed.</p>

    <p>Pairwise automatically picks the optimal set of combinations so that every 2-Factor value pair is covered.</p>

    <p>Example: Browser (3) × OS (3) × Language (2) — Full produces 18, Pairwise reduces to about 9.</p>
    <p>Pro: sharply reduces TC count (the more variables, the bigger the win)<br />Con: specific combinations formed by 3+ Factors simultaneously may be missed</p>

    <p>Automatic fallbacks:</p>
    <ul>
      <li>With 1 Factor → the Factor's values are listed directly</li>
      <li>With 2 Factors → equivalent to Full Combination (by the definition of Pairwise)</li>
      <li>With 3+ Factors → Pairwise optimization is applied automatically</li>
    </ul>

    <p>Generation Limits (apply to all algorithms):</p>
    <ul>
      <li>A single Factor Combination simulation can create up to 5,000 test cases</li>
      <li>Applies the same way regardless of Full / Pairwise / Mixed</li>
      <li>Over 5,000 — a warning is shown at the simulation step and only the first 5,000 are displayed in the preview</li>
      <li>If you are approaching 5,000, add Constraints or split Factors</li>
    </ul>

    <p>When to use it:</p>
    <ul>
      <li>When time is limited (e.g., regression testing)</li>
      <li>When there are too many variables to run all combinations</li>
      <li>Empirically, a large share of defects is found in single-Factor and pair combinations</li>
    </ul>

    <h3>3-3. Mixed Combination (auto)</h3>
    <aside className="guide-callout info">
      Mixed is not a user-selectable option. It is auto-applied at simulation time when Factors are given different types.
    </aside>
    <p>If some Factors are set to Full Combination and others to Pairwise, T-CAFE keeps every combination of the Full-type Factors while distributing Pairwise-type Factor values evenly across them.</p>
    <p>Example: Browser / OS set to Full and Language set to Pairwise → every Browser × OS combination is kept, while Language values are cycled through.</p>

    <hr />

    <h2>4. Constraint</h2>
    <p>Not every combination is meaningful in the real world. Use Constraints to exclude impossible or unnecessary combinations.</p>

    <h3>Constraint Types (3)</h3>
    <table>
      <thead>
        <tr><th>UI label</th><th>Meaning</th><th>Example</th></tr>
      </thead>
      <tbody>
        <tr><td>If-Then</td><td>When a condition is met, another Factor must take a specific value</td><td>"When Browser = Safari, OS must be Mac"</td></tr>
        <tr><td>One-Way Exclude</td><td>When one condition is true, exclude a specific combination (one-direction)</td><td>"When OS = Windows, exclude Browser = Safari"</td></tr>
        <tr><td>Two-Way Exclude</td><td>Ensure the two specified values never appear together (both directions)</td><td>"Exclude the Browser = Safari + OS = Windows combination"</td></tr>
      </tbody>
    </table>

    <h3>Example — "Safari does not work on Windows"</h3>
    <ul>
      <li>One-Way Exclude: OS = Windows ➜ exclude Browser = Safari</li>
      <li>Two-Way Exclude: mark Browser = Safari and OS = Windows as incompatible</li>
    </ul>
    <p>→ Either way, the "Safari + Windows" combination is excluded from the simulation.</p>

    <hr />

    <h2>5. Factor Combination Flow</h2>
    <aside className="guide-callout">Permission required: Admin or Team Admin</aside>

    <h3>Screen Layout</h3>
    <p>The Factor Combination screen has three tabs at the top; work through them in order:</p>
    <ol>
      <li>Simulation tab — define Factors / Constraints and simulate</li>
      <li>Details tab — enter properties common to every generated TC (Priority, Case Type, Owner, etc.)</li>
      <li>Steps &amp; Test Data tab — define the per-combination step matrix</li>
    </ol>

    <h3>Step 1: Pick a Folder</h3>
    <ol>
      <li>On the Test Cases page, select the folder for the Factor Combination (create one via New Folder if needed)</li>
    </ol>
    <aside className="guide-callout info">
      Factor Combination indicator: any folder that has saved a Factor Combination at least once shows an orange ⚡ icon next to its name in the left tree. You can see at a glance which folders have existing designs, making it easier to decide whether to edit an existing one or start fresh in a new folder. The icon does not propagate to the parent — it shows only on folders with an actual configuration.
    </aside>

    <h3>Step 2: Start the Factor Combination</h3>
    <ol>
      <li>Click the + Create Test Case button at the top</li>
      <li>Choose Factor Combination from the dropdown</li>
      <li>The Factor Combination screen opens (Simulation tab)</li>
    </ol>

    <ScreenshotSlot label="Factor Combination entry screen" src={img01} />

    <h3>Step 3: Define Factors (Simulation tab)</h3>
    <ol>
      <li>Click + Add Factor</li>
      <li>Enter the Factor name (e.g., "Browser")</li>
      <li>Pick the Factor type — Full Combination or Pairwise</li>
      <li>Add Values: enter each value (e.g., Chrome, Firefox, Safari)</li>
      <li>Repeat to add more Factors as needed</li>
    </ol>

    <ScreenshotSlot label="Factor definition screen" src={img02} />

    <h3>Step 4: Add Constraints (optional, Simulation tab)</h3>
    <ol>
      <li>Click + Add Constraint</li>
      <li>Pick a Constraint Type: If-Then / One-Way Exclude / Two-Way Exclude</li>
      <li>Pick Factor 1 from the dropdown → Pick a value from Value 1</li>
      <li>Pick Factor 2 from the dropdown → Pick a value from Value 2</li>
      <li>Save with the Add Constraint button</li>
    </ol>
    <aside className="guide-callout info">
      All three Constraint Types share the same flow. After picking Factor 1 / Value 1 / Factor 2 / Value 2, click Add Constraint to add the entry directly — there is no separate "Add Value" step.
    </aside>
    <p>Meaning by type:</p>
    <ul>
      <li>If-Then: when Factor 1 = Value 1, then Factor 2 must equal Value 2 (conditional link)</li>
      <li>One-Way Exclude: exclude the combination where Factor 1 = Value 1 and Factor 2 = Value 2 (one-directional)</li>
      <li>Two-Way Exclude: exclude any combination where Factor 1 = Value 1 and Factor 2 = Value 2 appear together (both directions)</li>
    </ul>

    <h3>Step 5: Simulate (Simulation tab)</h3>
    <ol>
      <li>Click the Simulate button</li>
      <li>The preview of combinations that will be generated appears (up to 5,000; a warning is shown if over)</li>
      <li>If the result isn't right, adjust Factors or Constraints and Simulate again</li>
    </ol>

    <ScreenshotSlot label="Simulation results" src={img03} />

    <h3>Step 6: Common Properties (Details tab)</h3>
    <ol>
      <li>Click the Details tab at the top</li>
      <li>Enter properties to apply to every generated TC (Description, Priority, Owner, Components, Labels, Case Type, UDFs, etc.)</li>
      <li>Click Apply — the common info is saved and applied to subsequent TC creation</li>
    </ol>

    <aside className="guide-callout info">
      If you don't save Details, TC creation shows a "Please save Details information first" warning and cannot proceed.
    </aside>

    <h3>Step 7: Steps Matrix (Steps &amp; Test Data tab, optional)</h3>
    <ol>
      <li>Click the Steps &amp; Test Data tab at the top</li>
      <li>In a matrix of test steps (rows) × combinations (columns), choose which steps apply per combination and enter Test Data</li>
      <li>See §8 Steps Matrix below for details</li>
    </ol>

    <h3>Step 8: Create TCs</h3>
    <ol>
      <li>Click the Create Test Case button at the top-right of the screen</li>
      <li>A TC is automatically created for each simulated combination</li>
      <li>TC names are assigned automatically in the form "<code>folder-Factor1value-Factor2value-…</code>" (e.g., "Cross Browser-Chrome-Desktop-Login")</li>
      <li>Generated TCs are marked with an F badge (Factor type) in the list</li>
    </ol>

    <hr />

    <h2>6. Characteristics of Generated TCs</h2>

    <h3>Auto-assigned Fields</h3>
    <ul>
      <li>Name: folder name + each Factor value joined with "-"</li>
      <li>TC key: auto-assigned (e.g., PROJ-15, PROJ-16…)</li>
      <li>Factor Values: the specific combination is stored as metadata</li>
      <li>Factor Signature: a key that uniquely identifies the combination</li>
      <li>Test steps: default template + each Factor value is auto-inserted</li>
    </ul>

    <h3>Common Fields (Assignment Statistics)</h3>
    <p>Applied identically to every generated TC:</p>
    <ul>
      <li>Priority</li>
      <li>Case Type</li>
      <li>Components</li>
      <li>Labels</li>
      <li>Owner</li>
      <li>UDFs (User Defined Fields)</li>
    </ul>
    <p>Entered once when creating the Factor Combination; automatically applied to every generated TC.</p>

    <hr />

    <h2>7. Editing Factor TCs / Factor Combinations</h2>
    <aside className="guide-callout">Permission required: Admin or Team Admin</aside>

    <h3>Editing a Single Factor TC</h3>
    <p>Each generated Factor TC can be opened and edited individually, just like a Single TC.</p>
    <ol>
      <li>Click the Key or Name of the Factor TC to edit in the TC list</li>
      <li>On the edit page, modify the name · Description · Precondition · test steps · UDFs directly</li>
      <li>Save</li>
    </ol>
    <p>The edit page uses the same UI as a Single TC. Factor metadata (which combination it is) is shown read-only.</p>

    <h3>Re-editing the Factor Combination Structure (Factors / Values / Constraints)</h3>
    <p>To change the structure itself (add / remove Factors, change Values, edit Constraints), reopen the Factor Combination screen on that folder and adjust it on the Simulation tab. Update the Details and Steps &amp; Test Data tabs in turn, then regenerate via Apply / Create Test Case.</p>

    <aside className="guide-callout info">
      If you change the Factor Combination structure significantly, previously generated TCs may no longer match expectations. It is often cleanest to delete them and regenerate. TCs already in a TP with execution history are snapshot-copied and thus unaffected by structural changes.
    </aside>

    <hr />

    <h2>8. Steps Matrix</h2>
    <p>In Factor Combination, you can define different steps for each combination.</p>

    <h3>Steps Matrix View</h3>
    <ul>
      <li>Rows: test steps (Step 1, 2, 3…)</li>
      <li>Columns: each combination TC</li>
    </ul>

    <h3>Usage</h3>
    <ol>
      <li>Common steps are checked for every combination</li>
      <li>Steps that apply only to specific combinations are checked for those columns only</li>
      <li>Example: a "Mac-only permission check" step is checked only for Mac combinations</li>
    </ol>

    <ScreenshotSlot label="Steps Matrix" src={img04} />

    <hr />

    <h2>9. Real Example — Cross-browser Test</h2>

    <h3>Scenario</h3>
    <p>Test the login feature of a web application across various environments.</p>

    <h3>Factors</h3>
    <table>
      <thead>
        <tr><th>Factor</th><th>Values</th></tr>
      </thead>
      <tbody>
        <tr><td>Browser</td><td>Chrome, Firefox, Safari</td></tr>
        <tr><td>Device</td><td>Desktop, Mobile</td></tr>
        <tr><td>Feature</td><td>Login</td></tr>
      </tbody>
    </table>

    <h3>Constraint</h3>
    <p>None (every combination is meaningful).</p>

    <h3>Simulation Result</h3>
    <p>3 × 2 × 1 = 6 combinations</p>
    <table>
      <thead>
        <tr><th>#</th><th>Browser</th><th>Device</th><th>Feature</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Chrome</td><td>Desktop</td><td>Login</td></tr>
        <tr><td>2</td><td>Chrome</td><td>Mobile</td><td>Login</td></tr>
        <tr><td>3</td><td>Firefox</td><td>Desktop</td><td>Login</td></tr>
        <tr><td>4</td><td>Firefox</td><td>Mobile</td><td>Login</td></tr>
        <tr><td>5</td><td>Safari</td><td>Desktop</td><td>Login</td></tr>
        <tr><td>6</td><td>Safari</td><td>Mobile</td><td>Login</td></tr>
      </tbody>
    </table>

    <h3>Auto-generated TC Names</h3>
    <ul>
      <li>Cross Browser-Chrome-Desktop-Login</li>
      <li>Cross Browser-Chrome-Mobile-Login</li>
      <li>Cross Browser-Firefox-Desktop-Login</li>
      <li>Cross Browser-Firefox-Mobile-Login</li>
      <li>Cross Browser-Safari-Desktop-Login</li>
      <li>Cross Browser-Safari-Mobile-Login</li>
    </ul>

    <h3>Common Steps</h3>
    <ol>
      <li>Open the application on that environment</li>
      <li>Test the login feature</li>
      <li>Verify UI rendering</li>
    </ol>

    <p>Every combination shares the same steps, but Test Data differs per environment.</p>

    <hr />

    <h2>10. Best Practices</h2>

    <h3>DO</h3>
    <ul>
      <li>Clear Factor names: self-descriptive, like "Browser" or "OS"</li>
      <li>Realistic values: only what you actually support (don't put Safari under Windows)</li>
      <li>Use Pairwise aggressively: with 4+ variables, Pairwise is recommended</li>
      <li>Use Constraints aggressively: remove impossible combinations up front</li>
      <li>Simulate before generating: preview first — don't generate blindly</li>
    </ul>

    <h3>DON'T</h3>
    <ul>
      <li>Too many Factors (10+ becomes unmanageable)</li>
      <li>Too many Values per Factor (5–7 per Factor recommended)</li>
      <li>Unrealistic combinations without Constraints</li>
      <li>Uniform steps that ignore the Steps Matrix</li>
    </ul>

    <hr />

    <h2>11. Differences between Factor TCs and Regular TCs</h2>
    <table>
      <thead>
        <tr><th>Aspect</th><th>Single TC</th><th>Factor TC</th></tr>
      </thead>
      <tbody>
        <tr><td>Creation</td><td>Manual</td><td>Bulk auto-generation via Factor Combination simulation</td></tr>
        <tr><td>TC key</td><td>Auto-assigned</td><td>Auto-assigned</td></tr>
        <tr><td>Name</td><td>User-entered</td><td>Folder name + each Factor value joined with "-", auto-assigned</td></tr>
        <tr><td>Editable fields</td><td>All general properties</td><td>Name, Description, steps, UDFs — all general properties editable. Factor metadata (combination values) is read-only</td></tr>
        <tr><td>Folder move</td><td>Move freely</td><td>Each TC can be moved freely (only folder_id changes). The Factor Combination definition stays in the original folder</td></tr>
        <tr><td>List badge</td><td>S badge</td><td>F badge</td></tr>
        <tr><td>Delete</td><td>Delete individually</td><td>Delete individually. The original Factor Combination definition (the factor_combinations record) remains until the folder is deleted</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>12. Common Issues</h2>
    <table>
      <thead>
        <tr><th>Issue</th><th>Cause</th><th>Solution</th></tr>
      </thead>
      <tbody>
        <tr><td>Factor Combination is not in the + Create Test Case dropdown</td><td>No permission (canEditTC required)</td><td>Verify Admin / Team Admin permission</td></tr>
        <tr><td>Simulation result has too many rows / over 5,000</td><td>Too many Factors / values, or not enough Constraints</td><td>Switch to Pairwise, add Constraints, or split Factors</td></tr>
        <tr><td>Some combinations are missing after generation</td><td>Constraints over-restrict</td><td>Review the Constraints</td></tr>
        <tr><td>"Please save Details information first" warning</td><td>You did not click Apply on the Details tab</td><td>Details tab → fill in required fields → click Apply, then retry</td></tr>
        <tr><td>Duplicate Factor name error</td><td>Two Factors with the same name</td><td>Rename one</td></tr>
        <tr><td>Korean Factor names are garbled</td><td>Encoding issue</td><td>Verify UTF-8</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>13. Why Is Pairwise Effective?</h2>
    <p>Research suggests:</p>
    <ul>
      <li>Bugs from a single variable: roughly 35%</li>
      <li>Bugs from two-variable combinations: roughly 40%</li>
      <li>Bugs from three-variable combinations: roughly 15%</li>
      <li>Bugs from four or more variables: roughly 10%</li>
    </ul>
    <p>→ Pairwise catches ~75% of bugs, with a 50–80% reduction in TC count compared to Full Combination.</p>
    <p>(Source: NIST's research on combinatorial testing and analyses of industry defect data — see NIST SP 500-267, etc.)</p>

    <hr />

    <h2>Next Steps</h2>
    <ul>
      <li><Link to="/support/guide/test-cases">05. Test Case Basics</Link></li>
      <li><Link to="/support/guide/test-plans">10. Test Plan Management</Link> — adding generated Factor TCs to a TP</li>
      <li><Link to="/support/guide/configuration">13. Configuration</Link> — pre-configure Components and Case Types</li>
    </ul>
  </article>
);

export default { ko: <FactorCombination />, en: <FactorCombinationEn /> };
