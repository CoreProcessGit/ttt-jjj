import React from 'react';
import { Link } from 'react-router-dom';
import ScreenshotSlot from './ScreenshotSlot';
import img01 from '../../assets/user_guide/09-importexport/01.png';
import img02 from '../../assets/user_guide/09-importexport/02.png'

const ImportExport = () => (
  <article className="guide-article">
    <h1>09. Import / Export — 테스트 케이스 엑셀 가져오기 · 내보내기</h1>
    <p className="guide-lead">
      T-CAFE는 테스트 케이스를 엑셀(Excel), CSV, JSON 형식으로 주고받는 기능을 제공합니다. 기존에 엑셀로 관리하던 테스트 케이스를 그대로 가져올 수 있고, 다른 테스트 관리 도구에서 마이그레이션하거나 백업·외부 보고에 활용할 때도 사용합니다.
    </p>

    <hr />

    <h2>1. 권한</h2>
    <table>
      <thead>
        <tr>
          <th>작업</th>
          <th className="center">Admin</th>
          <th className="center">Team Admin</th>
          <th className="center">Tester</th>
          <th className="center">Developer</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Import (CSV/JSON/Excel)</td><td className="center">O</td><td className="center">O</td><td className="center">X</td><td className="center">X</td></tr>
        <tr><td>Export (CSV/JSON/Excel)</td><td className="center">O</td><td className="center">O</td><td className="center">O</td><td className="center">X</td></tr>
      </tbody>
    </table>
    <p>→ Export는 Admin / Team Admin / Tester만 가능 (Developer는 조회만)<br />→ Import는 Admin / Team Admin만 가능 (데이터 변경 성격)</p>

    <hr />

    <h2>2. 지원 형식</h2>
    <table>
      <thead>
        <tr><th>형식</th><th className="center">Import</th><th className="center">Export</th><th>비고</th></tr>
      </thead>
      <tbody>
        <tr><td>CSV</td><td className="center">O</td><td className="center">O</td><td>엑셀/구글 시트 호환</td></tr>
        <tr><td>JSON</td><td className="center">O</td><td className="center">O</td><td>다른 시스템 통합</td></tr>
        <tr><td>Excel (XLSX)</td><td className="center">O</td><td className="center">O</td><td>엑셀 직접 사용</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>3. Export (내보내기)</h2>

    <h3>3-1. 진입 경로</h3>
    <p>Test Cases 페이지 상단 액션 바의 Export 버튼</p>

    <h3>3-2. 절차</h3>
    <ol>
      <li>(선택) 좌측 폴더에서 특정 폴더 선택, 또는 검색·필터 적용, 또는 체크박스로 TC 선택</li>
      <li>상단의 Export 버튼 클릭</li>
      <li>드롭다운 메뉴에서 형식 선택: Excel (.xlsx) / CSV (.csv) / JSON (.json) — 클릭 즉시 파일이 다운로드되며 별도 확인 단계는 없습니다</li>
    </ol>

    <h3>3-2-1. 자동 적용되는 Export 범위</h3>
    <p>별도의 "범위 선택" 다이얼로그는 없으며, 다음 우선순위로 자동 결정됩니다:</p>
    <ol>
      <li>체크박스로 선택한 TC가 있으면 → 선택된 TC만 Export</li>
      <li>선택이 없으면 → 현재 화면에 표시된 필터 결과(filteredTestCases) 전체 Export</li>
    </ol>
    <p>표시된 결과가 없으면 "No test cases to export" 경고가 표시됩니다.</p>

    <ScreenshotSlot label="Export 메뉴" src={img01} />

    <h3>3-3. Export 항목 (실제 출력 필드 — 컬럼 순서 그대로)</h3>
    <aside className="guide-callout info">
      Excel / CSV / JSON 세 포맷 모두 동일한 컬럼 순서로 출력됩니다. 한 포맷에서 편집한 파일을 다른 포맷으로 저장하여 재 import해도 round-trip 호환됩니다.
    </aside>
    <ol>
      <li>Folder — TC가 속한 폴더의 leaf 이름 (예: <code>OAuth</code>)</li>
      <li>Folder Path — 루트부터의 전체 경로, <code>/</code> 구분자 (예: <code>Authentication/Login/OAuth</code>)</li>
      <li>Key (예: PROJ-1)</li>
      <li>Name (필수, 헤더에 <code>*</code> 표시)</li>
      <li>Description</li>
      <li>Precondition</li>
      <li>Type (single / factor)</li>
      <li>Case Type</li>
      <li>Priority</li>
      <li>Status — <code>Draft</code> 또는 <code>Confirmed</code> (TC Status)</li>
      <li>Components, Labels</li>
      <li>User Defined Fields (UDF) — 정의된 필드 각각이 별도 컬럼으로 추가 (필수 필드는 헤더에 <code>*</code> 표시)</li>
      <li>Test Steps — Step No / Step / Test Data / Expected Result</li>
    </ol>

    <h3>3-4. CSV 형식 예시</h3>
    <pre><code>{`Folder,Folder Path,Key,Name *,Description,Precondition,Type,Case Type,Priority,Status,Components,Labels,Step No,Step,Test Data,Expected Result
OAuth,Authentication/Login/OAuth,PROJ-1,Login with valid credentials,Verify user can login,User account exists,single,Function,High,Confirmed,"Frontend,Authentication","smoke,critical",1,Navigate to login page,URL: /login,Login page displayed
,,,,,,,,,,,,2,Enter credentials,user/pass,Logged in
Login,Authentication/Login,PROJ-2,Login with invalid password,,,single,Function,Medium,Draft,"Frontend,Authentication",negative,1,Open page,-,Page loads`}</code></pre>
    <aside className="guide-callout info">
      다단계 스텝 표기: 같은 TC에 여러 스텝이 있으면 두 번째 스텝부터 같은 TC의 메타데이터(Folder/Key/Name 등)를 비워둡니다. 같은 TC에 이어지는 스텝으로 인식됩니다.
    </aside>

    <h3>3-5. JSON 형식 예시 (실제 구조)</h3>
    <pre><code>{`{
  "exportInfo": {
    "timestamp": "2026-04-16T10:00:00.000Z",
    "version": "1.0",
    "source": "Jira Test Archive - production",
    "totalTestCases": 2,
    "requiredFields": ["name"]
  },
  "testCases": [
    {
      "folder": "OAuth",
      "folderPath": "Authentication/Login/OAuth",
      "key": "PROJ-1",
      "name": "Login with valid credentials",
      "description": "Verify user can login",
      "precondition": "User account exists",
      "type": "single",
      "caseType": "Function",
      "priority": "High",
      "status": "Confirmed",
      "components": ["Frontend", "Authentication"],
      "labels": ["smoke", "critical"],
      "userDefinedFields": {},
      "testSteps": [
        {
          "step": "Navigate to login page",
          "testData": "URL: /login",
          "expectedResult": "Login page displayed"
        }
      ]
    }
  ]
}`}</code></pre>

    <h3>3-6. Excel 형식 특징</h3>
    <ul>
      <li>워크시트 이름: <code>Test Cases</code> 단일 시트</li>
      <li>컬럼 순서: 3-3 그대로 (Folder, Folder Path가 맨 앞)</li>
      <li>UDF + Test Steps (Step No / Step / Test Data / Expected Result는 같은 행에 인라인 4열로 표시)</li>
      <li>첫 행은 헤더(굵게 표시), 필수 필드는 <code>*</code> 표시</li>
    </ul>

    <hr />

    <h2>4. Import (가져오기)</h2>

    <h3>4-1. 진입 경로</h3>
    <p>Test Cases 페이지 상단 액션 바의 Import 버튼</p>
    <aside className="guide-callout">Admin / Team Admin만 표시됩니다 (Tester / Developer는 Import 불가).</aside>

    <h3>4-2. 절차</h3>
    <ol>
      <li>상단의 Import 버튼 클릭</li>
      <li>Import Template Modal이 열립니다. 다음 두 가지 작업이 가능합니다:
        <ul>
          <li>템플릿 다운로드 — CSV / Excel / JSON 3가지 형식 중 선택. 템플릿에는 현재 프로젝트의 Priorities, Case Types, Components, User-Defined Fields가 미리 채워져 있어 다운로드 → 데이터 입력 → 그대로 Import 가능합니다</li>
          <li>파일 선택하여 Import — 이미 준비된 파일이 있으면 바로 업로드</li>
        </ul>
      </li>
      <li>"Select File to Import" 버튼 → OS 파일 선택 다이얼로그 → <code>.csv</code> / <code>.json</code> / <code>.xlsx</code> 선택</li>
      <li>업로드된 파일이 파싱·검증·import됩니다 (별도 매핑 화면, 미리보기 화면, 옵션 선택 화면은 없습니다)</li>
      <li>진행률 다이얼로그가 표시됩니다 (한 번에 최대 5,000개)</li>
      <li>완료 후 결과 요약 모달(Added / Updated / Skipped / Failed 카운트)과 경고/실패 목록이 표시됩니다</li>
    </ol>

    <ScreenshotSlot label="Import 메뉴" src={img02} />

    <h3>4-3. Import 동작 방식 (자동 merge 모드)</h3>
    <p>T-CAFE는 항상 merge 모드로 import하며, Skip / Overwrite / Create Duplicate 같은 사용자 선택 옵션을 제공하지 않습니다. 동작은 다음과 같이 자동 결정됩니다:</p>
    <ul>
      <li>파일의 <code>key</code>가 기존 TC의 <code>key</code>와 일치하면 → 해당 TC를 부분 업데이트 (입력된 비어있지 않은 필드만 갱신)</li>
      <li>일치하는 TC가 없거나 <code>key</code>가 비어 있으면 → 새 TC 생성, 새 키 자동 부여 (<code>{'<프로젝트키>-<순번>'}</code>)</li>
      <li>유효하지 않은 행(필수 항목 누락 등)은 Skipped로 카운트되며 경고에 사유가 기록됩니다</li>
    </ul>

    <h3>4-3-0. Key 검증 규칙</h3>
    <ul>
      <li>비어있음 → 자동으로 <code>{'<프로젝트키>-<순번>'}</code> 형식으로 생성됨</li>
      <li>형식이 잘못됨 (예: <code>bad-key</code>) → 경고 후 자동 생성으로 대체</li>
      <li>다른 프로젝트 prefix (예: RC01 프로젝트에 <code>PROJ-999</code>) → 경고 후 자동 생성으로 대체</li>
      <li>같은 파일 내에서 같은 Key 를 여러 행에 사용 → 2번째 이후 행은 Failed 로 분류</li>
      <li>같은 import 세션에서 방금 생성된 Key 를 재사용 → Failed 로 분류 (덮어쓰기 방지)</li>
      <li>기존 DB 에 존재하는 Key → 해당 TC UPDATE</li>
    </ul>

    <h3>4-3-1. 필드 / 배열 길이 상한</h3>
    <p>아래 상한을 초과하는 값이 들어오면 자동으로 잘린 후 저장되고 결과 리포트에 경고가 표시됩니다 (TC 자체는 저장됨):</p>
    <table className="guide-table">
      <thead>
        <tr><th>필드</th><th>상한</th><th>초과 시</th></tr>
      </thead>
      <tbody>
        <tr><td>Name</td><td>500자</td><td>500자까지 저장</td></tr>
        <tr><td>Description</td><td>16,000자</td><td>잘림</td></tr>
        <tr><td>Precondition</td><td>16,000자</td><td>잘림</td></tr>
        <tr><td>Test Steps (개수)</td><td>500개</td><td>앞 500개만 유지</td></tr>
        <tr><td>각 Step의 Step / Test Data / Expected Result</td><td>5,000자</td><td>잘림</td></tr>
        <tr><td>Components / Labels (개수)</td><td>각 50개</td><td>앞 50개만 유지</td></tr>
        <tr><td>UDF Text</td><td>16,000자</td><td>잘림</td></tr>
        <tr><td>UDF URL</td><td>2,000자</td><td>잘림</td></tr>
      </tbody>
    </table>

    <h3>4-3-2. Status (TC Status) 컬럼</h3>
    <ul>
      <li>허용 값: <code>Draft</code>, <code>Confirmed</code> (대소문자 무관)</li>
      <li>빈 값 또는 허용 값 외: <code>Draft</code> 로 저장되며 경고 기록</li>
      <li>Confirmed 로 import 한 TC는 Test Plan 에 바로 추가 가능. Draft 는 Test Plan 추가 목록에 나오지 않음.</li>
    </ul>

    <h3>4-3-1. 폴더 자동 생성 (folderPath 기반)</h3>
    <p>Import 시 <code>folder path</code> 컬럼 값에 따라 폴더가 자동 처리됩니다:</p>
    <ul>
      <li><code>folder path</code>가 지정된 경로 형식(예: <code>Authentication/Login/OAuth</code>)이면 → 경로의 각 레벨이 자동 생성되고 TC가 leaf 폴더에 배정됩니다. 이미 존재하는 폴더는 재사용되어 중복 생성되지 않습니다.</li>
      <li><code>folder path</code>가 비어 있으면 → 업로드한 파일명에서 확장자를 제거한 이름으로 root-level 폴더가 자동 생성되고 TC가 그 폴더에 배정됩니다 (기존 동작 유지).</li>
      <li>구분자는 <code>/</code> (권장) 또는 <code>{' > '}</code>(legacy 호환) 둘 다 인식됩니다.</li>
    </ul>
    <aside className="guide-callout info">
      동일 레벨 폴더명 중복 방지: 같은 부모 폴더 아래에 같은 이름의 폴더는 단 1개만 존재합니다. Import가 같은 경로에 대해 중복 폴더를 만들지 않으므로, 같은 파일을 여러 번 import해도 폴더는 그대로 유지됩니다.
    </aside>

    <h3>4-3-2. 멱등성 (같은 파일 재 import)</h3>
    <p>같은 Export 파일을 다시 import하면:</p>
    <ul>
      <li>Key가 일치하는 모든 TC는 UPDATE만 발생, 새 INSERT는 일어나지 않습니다.</li>
      <li>folderPath가 같으면 같은 폴더가 재사용되어 새 폴더가 생기지 않습니다.</li>
      <li>결과적으로 데이터 중복 없이 정합성이 회복됩니다 — 부분 실패 시 같은 파일을 다시 import하면 안전하게 회복됩니다.</li>
    </ul>

    <h3>4-3-3. 동시 Import 차단 (세션 lock)</h3>
    <p>같은 프로젝트에 대해 Import는 동시에 1명만 실행할 수 있습니다:</p>
    <ul>
      <li>다른 사용자가 이미 Import 진행 중이면 → "Another import is currently in progress for this project. Please try again in a few minutes." 메시지가 표시되고 차단됩니다.</li>
      <li>비정상 종료(브라우저 닫기, 네트워크 단절)로 세션이 멈춰도 5분 이내 자동 회복되어 다른 사용자가 Import 가능합니다.</li>
    </ul>

    <h3>4-4. 인식되는 컬럼명 (대소문자 무시, 끝의 <code>*</code> 자동 제거)</h3>
    <ul>
      <li>필수: <code>name</code></li>
      <li>식별: <code>key</code> — 매칭 시 업데이트, 비어 있으면 신규 생성</li>
      <li>일반 필드: <code>description</code>, <code>objective</code>, <code>precondition</code>, <code>type</code>(single/factor), <code>case type</code>, <code>priority</code>, <code>owner</code></li>
      <li>폴더: <code>folder</code>, <code>folder path</code> — <code>folder path</code>가 우선 적용. 경로 형식(<code>A/B/C</code>)이면 중첩 폴더가 자동 생성됨. 둘 다 비어 있으면 파일명으로 폴더 자동 생성</li>
      <li>다중값: <code>components</code>, <code>labels</code> — 콤마 또는 세미콜론으로 구분</li>
      <li>스텝: <code>step no</code>, <code>step</code>(또는 <code>step description</code>), <code>test data</code>, <code>expected result</code></li>
      <li>UDF: Configuration에 정의된 사용자 정의 필드 이름과 일치하면 자동 매핑 (체크박스/숫자/선택형은 적절히 변환). required UDF가 비어 있으면 해당 행 SKIP</li>
    </ul>

    <h3>4-5. Import 결과 응답</h3>
    <p>완료 후 결과 모달에 다음 값이 표시됩니다:</p>
    <ul>
      <li>Added — 새로 생성된 TC 개수 (녹색 배지)</li>
      <li>Updated — 키 매칭으로 업데이트된 TC 개수 (파란 배지)</li>
      <li>Skipped — 검증 실패로 건너뛴 행 개수 (주황 배지) — name 누락, required UDF 누락 등</li>
      <li>Failed — INSERT/UPDATE 도중 SQL 에러로 실패한 행 (빨간 배지, 신규)</li>
      <li>warnings 카테고리화: Replaced(invalid 값을 default로 대체), Excluded(unknown component/issue 제외), Skipped(SKIP 사유), Other(기타). 각 항목은 row 번호와 함께 표시됩니다.</li>
      <li>Download Log 버튼으로 텍스트 파일 다운로드 가능 — 외부 도구로 분석할 수 있도록 모든 카테고리(Failed/Replaced/Excluded/Skipped/Other)가 row 번호와 함께 기록됩니다.</li>
    </ul>
    <p>한 번의 Import에서 5,000개를 초과하면 전체가 거부되며 "Import size exceeds maximum limit of 5000 test cases" 에러가 표시됩니다.</p>
    <aside className="guide-callout info">
      5,000 TC 처리 시간: 평균 약 20~25초 (500개 batch × 10번 = 약 1.5~2초/batch). Bulk INSERT + 메모리 폴더 캐시로 N+1 쿼리 없이 처리됩니다.
    </aside>

    <hr />

    <h2>5. Test Steps 형식 변환</h2>
    <p>가장 까다로운 부분은 Test Steps의 변환입니다.</p>

    <h3>지원 형식</h3>
    <p>T-CAFE는 다음 두 가지 Test Steps 형식을 지원합니다.</p>

    <h4>형식 A: 스텝마다 별도 행 (CSV / Excel)</h4>
    <pre><code>{`TC Key | Step # | Step | Test Data | Expected
PROJ-1 | 1 | Open | - | Page loads
PROJ-1 | 2 | Type | username | Field filled`}</code></pre>
    <p>같은 TC에 속하는 스텝은 연속된 행으로 작성하되, 2번째 행부터는 TC Name/Key를 비워두면 앞 행의 TC에 이어지는 스텝으로 인식됩니다.</p>

    <h4>형식 B: JSON 배열 (T-CAFE 권장)</h4>
    <pre><code>{`[
 {"step": "Open page", "testData": "-", "expectedResult": "Page loads"},
 {"step": "Type username", "testData": "user1", "expectedResult": "Field filled"}
]`}</code></pre>
    <p>JSON Import 시 각 TC의 <code>testSteps</code> 필드에 배열로 넣으면 가장 명확하고 안전하게 전달됩니다.</p>

    <h3>변환 팁</h3>
    <ul>
      <li>한 셀에 모든 스텝을 구분자(<code>|</code>, <code>;</code>, <code>\n</code>)로 이어붙이는 방식은 지원하지 않습니다 → 행 단위로 분리</li>
      <li>CSV 셀 내부에 줄바꿈을 넣으려면 반드시 따옴표로 감싸세요 (스텝 내부 설명에만 사용 권장)</li>
      <li>빈 값은 셀을 비워두세요 — <code>-</code>나 <code>N/A</code> 같은 표시는 그대로 텍스트로 저장됩니다</li>
    </ul>

    <hr />

    <h2>6. Import/Export 베스트 프랙티스</h2>

    <h3>DO</h3>
    <ul>
      <li>Import Template Modal에서 템플릿 다운로드: 현재 프로젝트의 Priority/Case Type/Component/UDF가 미리 채워져 있어 검증 오류가 줄어듭니다</li>
      <li>소량으로 먼저 테스트: 5~10개로 Import 테스트 후 전체 진행</li>
      <li>백업 후 Import: 기존 데이터를 먼저 Export하여 보관</li>
      <li>인코딩 확인: UTF-8 (한글 사용 시 BOM 권장)</li>
      <li>컬럼명 확인: 인식되는 컬럼명(4-4)에 맞춰 헤더 작성</li>
      <li>folder path 활용: 중첩 폴더 구조를 유지하려면 <code>folder path</code> 컬럼에 <code>A/B/C</code> 형식으로 작성</li>
      <li>5,000건 단위 분할: 한 번에 5,000건 초과 시 거부됨</li>
      <li>실패 시 같은 파일 재 import: 멱등성이 보장되므로 부분 실패 후 재 import해도 안전</li>
    </ul>

    <h3>DON'T</h3>
    <ul>
      <li>5,000건 초과 단일 파일 (자동 거부됨)</li>
      <li>같은 <code>key</code>를 가진 행을 두 번 Import (merge 모드라 두 번째에 업데이트 발생) — 단, 의도적 멱등성 활용은 OK</li>
      <li>Configuration(Priority / Case Type / Component) 미설정 상태로 Import — 검증 오류 다수 발생</li>
      <li>같은 프로젝트에 두 사람이 동시 Import — 두 번째 사용자는 차단됨</li>
      <li>Folder Path에 <code>/</code> 문자가 포함된 폴더명 사용 (구분자로 잘못 인식됨)</li>
    </ul>

    <hr />

    <h2>7. 자주 발생하는 문제</h2>
    <table>
      <thead>
        <tr><th>문제</th><th>원인</th><th>해결</th></tr>
      </thead>
      <tbody>
        <tr><td>Import 버튼이 안 보임</td><td>권한 없음</td><td>Admin / Team Admin 권한 필요 혹은 Role에서 수정 후 저장</td></tr>
        <tr><td>"Another import is currently in progress" 메시지</td><td>다른 사용자가 같은 프로젝트에 Import 진행 중</td><td>해당 사용자가 끝날 때까지 대기. 비정상 종료라면 5분 후 자동 회복</td></tr>
        <tr><td>"Import session has expired" 메시지</td><td>Import 도중 세션이 5분간 heartbeat 끊김 (네트워크 단절 등)</td><td>같은 파일로 재 Import (멱등성 보장)</td></tr>
        <tr><td>한글이 깨짐</td><td>인코딩 문제</td><td>UTF-8 또는 UTF-8 BOM으로 저장</td></tr>
        <tr><td>일부 행이 Skipped 처리됨</td><td>name 누락, required UDF 누락, 또는 validation 실패</td><td>결과 모달의 Skipped 카테고리에서 row 번호와 사유 확인 후 해당 행 보완</td></tr>
        <tr><td>일부 행이 Failed 처리됨</td><td>SQL 에러 (key 충돌, 길이 초과 등)</td><td>결과 모달의 Failed 카테고리에서 row 번호와 에러 확인. Download Log로 세부 분석</td></tr>
        <tr><td>Priority / Case Type / Component가 default로 변경됨</td><td>파일의 값이 Configuration에 없음</td><td>결과 모달의 Replaced 카테고리 확인. Configuration에서 항목 정의 후 재 Import</td></tr>
        <tr><td>같은 폴더가 두 번 생기지 않음 (좋은 동작)</td><td>UNIQUE 제약으로 동일 레벨 중복 차단</td><td>의도된 동작 — 같은 파일을 여러 번 import해도 폴더는 그대로 유지됨</td></tr>
        <tr><td>중첩 폴더가 자동 생성됨 (좋은 동작)</td><td>folder path 컬럼에 <code>A/B/C</code> 형식이 있음</td><td>의도된 동작 — 모든 중간 폴더가 부모→자식 순서로 자동 생성됨</td></tr>
        <tr><td>"Import size exceeds maximum limit of 5000" 에러</td><td>한 파일에 5,000개 초과</td><td>여러 파일로 분할해 순차 Import</td></tr>
        <tr><td>Folder Path 컬럼은 있는데 폴더가 안 생김</td><td>구분자가 잘못됨 (지원: <code>/</code>, <code>{' > '}</code>)</td><td><code>/</code> 또는 <code>{' > '}</code> 사용. 다른 구분자(<code>\\</code>, <code>|</code> 등)는 인식 안 됨</td></tr>
        <tr><td>같은 키의 TC가 의도치 않게 수정됨</td><td>merge 모드 — key 일치 시 업데이트 (멱등성 동작)</td><td>새 TC로 만들고 싶다면 파일에서 <code>key</code> 컬럼을 비워 두기</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>8. Export 활용 사례</h2>

    <h3>8-1. 주간 보고</h3>
    <ul>
      <li>매주 금요일 Test Cases → Export → 진행 상황 보고서</li>
    </ul>

    <h3>8-2. 외부 백업</h3>
    <ul>
      <li>매월 1회 전체 TC를 JSON으로 Export → 외부 저장소 보관</li>
    </ul>

    <h3>8-3. 다른 팀 공유</h3>
    <ul>
      <li>특정 폴더만 Export → 다른 팀에 Excel로 전달</li>
    </ul>

    <h3>8-4. 감사 자료</h3>
    <ul>
      <li>특정 시점의 TC 전체 Export → 감사 증빙</li>
    </ul>

    <h3>8-5. 분석</h3>
    <ul>
      <li>CSV Export → 엑셀 피벗 테이블로 분석</li>
    </ul>

    <hr />

    <h2>다음 단계</h2>
    <ul>
      <li><Link to="/support/guide/test-cases">05. 테스트 케이스</Link></li>
      <li><Link to="/support/guide/test-reports">12. 테스트 리포트</Link></li>
      <li><Link to="/support/guide/configuration">13. Configuration</Link></li>
    </ul>
  </article>
);

const ImportExportEn = () => (
  <article className="guide-article">
    <h1>09. Import / Export — Test Cases in Excel, CSV, JSON</h1>
    <p className="guide-lead">
      T-CAFE lets you exchange test cases in Excel, CSV, and JSON formats. Import test cases you already manage in Excel as-is, migrate from other test management tools, or use it for backups and external reporting.
    </p>

    <hr />

    <h2>1. Permissions</h2>
    <table>
      <thead>
        <tr>
          <th>Action</th>
          <th className="center">Admin</th>
          <th className="center">Team Admin</th>
          <th className="center">Tester</th>
          <th className="center">Developer</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Import (CSV / JSON / Excel)</td><td className="center">O</td><td className="center">O</td><td className="center">X</td><td className="center">X</td></tr>
        <tr><td>Export (CSV / JSON / Excel)</td><td className="center">O</td><td className="center">O</td><td className="center">O</td><td className="center">X</td></tr>
      </tbody>
    </table>
    <p>→ Export is available to Admin / Team Admin / Tester (Developers have view-only access)<br />→ Import is Admin / Team Admin only (write action)</p>

    <hr />

    <h2>2. Supported Formats</h2>
    <table>
      <thead>
        <tr><th>Format</th><th className="center">Import</th><th className="center">Export</th><th>Notes</th></tr>
      </thead>
      <tbody>
        <tr><td>CSV</td><td className="center">O</td><td className="center">O</td><td>Compatible with Excel / Google Sheets</td></tr>
        <tr><td>JSON</td><td className="center">O</td><td className="center">O</td><td>For integration with other systems</td></tr>
        <tr><td>Excel (XLSX)</td><td className="center">O</td><td className="center">O</td><td>Used directly in Excel</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>3. Export</h2>

    <h3>3-1. Navigation</h3>
    <p>The Export button in the top action bar of the Test Cases page.</p>

    <h3>3-2. Steps</h3>
    <ol>
      <li>(Optional) Select a folder in the left panel, or apply a search / filter, or check TCs with checkboxes</li>
      <li>Click the Export button at the top</li>
      <li>Choose a format from the dropdown: Excel (.xlsx) / CSV (.csv) / JSON (.json) — the file downloads immediately on click, without a confirmation step</li>
    </ol>

    <h3>3-2-1. Automatic Export Scope</h3>
    <p>There is no separate "Select Scope" dialog. The scope is determined automatically by the following priority:</p>
    <ol>
      <li>If any TCs are checked → only the selected TCs are exported</li>
      <li>If nothing is selected → the entire filtered result (filteredTestCases) currently displayed is exported</li>
    </ol>
    <p>If there are no displayed results, a "No test cases to export" warning is shown.</p>

    <ScreenshotSlot label="Export menu" src={img01} />

    <h3>3-3. Export Fields (output order as written)</h3>
    <aside className="guide-callout info">
      Excel / CSV / JSON all three formats share the same column order. A file edited in one format can be re-imported as any other format (round-trip compatible).
    </aside>
    <ol>
      <li>Folder — the leaf folder name the TC belongs to (e.g., <code>OAuth</code>)</li>
      <li>Folder Path — the full path from root, joined by <code>/</code> (e.g., <code>Authentication/Login/OAuth</code>)</li>
      <li>Key (e.g., PROJ-1)</li>
      <li>Name (required, marked with <code>*</code> in the header)</li>
      <li>Description</li>
      <li>Precondition</li>
      <li>Type (single / factor)</li>
      <li>Case Type</li>
      <li>Priority</li>
      <li>Status — <code>Draft</code> or <code>Confirmed</code> (TC Status)</li>
      <li>Components, Labels</li>
      <li>User Defined Fields (UDF) — each defined field is added as a separate column (required fields are marked with <code>*</code> in the header)</li>
      <li>Test Steps — Step No / Step / Test Data / Expected Result</li>
    </ol>

    <h3>3-4. CSV Example</h3>
    <pre><code>{`Folder,Folder Path,Key,Name *,Description,Precondition,Type,Case Type,Priority,Status,Components,Labels,Step No,Step,Test Data,Expected Result
OAuth,Authentication/Login/OAuth,PROJ-1,Login with valid credentials,Verify user can login,User account exists,single,Function,High,Confirmed,"Frontend,Authentication","smoke,critical",1,Navigate to login page,URL: /login,Login page displayed
,,,,,,,,,,,,2,Enter credentials,user/pass,Logged in
Login,Authentication/Login,PROJ-2,Login with invalid password,,,single,Function,Medium,Draft,"Frontend,Authentication",negative,1,Open page,-,Page loads`}</code></pre>
    <aside className="guide-callout info">
      Multi-step rows: when a TC has multiple steps, leave the TC metadata (Folder / Key / Name, etc.) blank from the second step onward — these rows are recognized as continuation steps of the same TC.
    </aside>

    <h3>3-5. JSON Example (actual structure)</h3>
    <pre><code>{`{
  "exportInfo": {
    "timestamp": "2026-04-16T10:00:00.000Z",
    "version": "1.0",
    "source": "Jira Test Archive - production",
    "totalTestCases": 2,
    "requiredFields": ["name"]
  },
  "testCases": [
    {
      "folder": "OAuth",
      "folderPath": "Authentication/Login/OAuth",
      "key": "PROJ-1",
      "name": "Login with valid credentials",
      "description": "Verify user can login",
      "precondition": "User account exists",
      "type": "single",
      "caseType": "Function",
      "priority": "High",
      "status": "Confirmed",
      "components": ["Frontend", "Authentication"],
      "labels": ["smoke", "critical"],
      "userDefinedFields": {},
      "testSteps": [
        {
          "step": "Navigate to login page",
          "testData": "URL: /login",
          "expectedResult": "Login page displayed"
        }
      ]
    }
  ]
}`}</code></pre>

    <h3>3-6. Excel Format Details</h3>
    <ul>
      <li>Worksheet name: a single <code>Test Cases</code> sheet</li>
      <li>Column order: as in 3-3 (Folder, Folder Path at the very front)</li>
      <li>UDF + Test Steps (Step No / Step / Test Data / Expected Result are displayed inline as 4 columns on the same row)</li>
      <li>The first row is the header (bold); required fields are marked with <code>*</code></li>
    </ul>

    <hr />

    <h2>4. Import</h2>

    <h3>4-1. Navigation</h3>
    <p>The Import button in the top action bar of the Test Cases page.</p>
    <aside className="guide-callout">Shown to Admin / Team Admin only (Tester / Developer cannot import).</aside>

    <h3>4-2. Steps</h3>
    <ol>
      <li>Click the Import button at the top</li>
      <li>The Import Template Modal opens, offering two actions:
        <ul>
          <li>Download a template — choose CSV / Excel / JSON. The template is pre-filled with the current project's Priorities, Case Types, Components, and User-Defined Fields, so you can download → fill in → import as-is</li>
          <li>Select a file and import — if you already have a prepared file, upload it directly</li>
        </ul>
      </li>
      <li>"Select File to Import" → OS file-picker → choose a <code>.csv</code> / <code>.json</code> / <code>.xlsx</code> file</li>
      <li>The uploaded file is parsed, validated, and imported (there is no separate mapping / preview / options screen)</li>
      <li>A progress dialog is shown (up to 5,000 rows at a time)</li>
      <li>On completion, a result summary modal (Added / Updated / Skipped / Failed counts) and a warnings / failures list are shown</li>
    </ol>

    <ScreenshotSlot label="Import menu" src={img02} />

    <h3>4-3. How Import Behaves (auto merge mode)</h3>
    <p>T-CAFE always imports in merge mode, without user-selected options like Skip / Overwrite / Create Duplicate. Behavior is determined automatically:</p>
    <ul>
      <li>If the file's <code>key</code> matches an existing TC's <code>key</code> → partially update that TC (update only non-empty input fields)</li>
      <li>If there is no matching TC, or <code>key</code> is empty → create a new TC with a newly assigned key (<code>{'<project-key>-<sequence>'}</code>)</li>
      <li>Invalid rows (missing required fields, etc.) are counted as Skipped, with the reason recorded in the warnings</li>
    </ul>

    <h3>4-3-0. Key Validation Rules</h3>
    <ul>
      <li>Empty → auto-generated as <code>{'<project-key>-<sequence>'}</code></li>
      <li>Invalid format (e.g., <code>bad-key</code>) → warning, replaced by auto-generated key</li>
      <li>Different project prefix (e.g., <code>PROJ-999</code> in RC01 project) → warning, replaced by auto-generated key</li>
      <li>Same Key used in multiple rows of one file → rows after the first are marked Failed</li>
      <li>Reusing a Key that was just inserted earlier in the same import session → marked Failed (prevents silent overwrite)</li>
      <li>Key matches an existing TC in the DB → that TC is UPDATEd</li>
    </ul>

    <h3>4-3-0-1. Field / Array Size Limits</h3>
    <p>Values exceeding these caps are automatically truncated and a warning is included in the result summary. The TC is still saved (only the value is trimmed):</p>
    <table className="guide-table">
      <thead>
        <tr><th>Field</th><th>Limit</th><th>On exceed</th></tr>
      </thead>
      <tbody>
        <tr><td>Name</td><td>500 chars</td><td>kept up to 500</td></tr>
        <tr><td>Description</td><td>16,000 chars</td><td>truncated</td></tr>
        <tr><td>Precondition</td><td>16,000 chars</td><td>truncated</td></tr>
        <tr><td>Test Steps (count)</td><td>500</td><td>first 500 kept</td></tr>
        <tr><td>Each Step's Step / Test Data / Expected Result</td><td>5,000 chars</td><td>truncated</td></tr>
        <tr><td>Components / Labels (count)</td><td>50 each</td><td>first 50 kept</td></tr>
        <tr><td>UDF Text</td><td>16,000 chars</td><td>truncated</td></tr>
        <tr><td>UDF URL</td><td>2,000 chars</td><td>truncated</td></tr>
      </tbody>
    </table>

    <h3>4-3-0-2. Status (TC Status) Column</h3>
    <ul>
      <li>Allowed values: <code>Draft</code>, <code>Confirmed</code> (case-insensitive)</li>
      <li>Empty or unknown values: saved as <code>Draft</code> with a warning</li>
      <li>Confirmed TCs can be added to Test Plans immediately. Draft TCs do not appear in the Test Plan "Add TC" list.</li>
    </ul>

    <h3>4-3-1. Auto-Created Folders (from folder path)</h3>
    <p>Folders are handled automatically based on the <code>folder path</code> column value:</p>
    <ul>
      <li>If <code>folder path</code> is a path form (e.g., <code>Authentication/Login/OAuth</code>) → each level is auto-created and the TC is placed in the leaf folder. Existing folders are reused (no duplicates).</li>
      <li>If <code>folder path</code> is empty → a root-level folder with the uploaded file's name (without extension) is auto-created and the TC is placed there (existing behavior preserved).</li>
      <li>Both <code>/</code> (recommended) and <code>{' > '}</code> (legacy compatibility) are recognized as separators.</li>
    </ul>
    <aside className="guide-callout info">
      No same-name folder duplicates at the same level: under the same parent, only one folder with a given name can exist. Import does not create duplicate folders for the same path, so re-importing the same file leaves folders intact.
    </aside>

    <h3>4-3-2. Idempotency (re-importing the same file)</h3>
    <p>Re-importing the same export file:</p>
    <ul>
      <li>All TCs with matching keys are UPDATEd; no new INSERTs happen.</li>
      <li>Matching folderPaths reuse the same folders; no new folders are created.</li>
      <li>Net effect: integrity is restored without data duplication — on partial failures, re-importing the same file safely recovers.</li>
    </ul>

    <h3>4-3-3. Concurrent Import Blocking (session lock)</h3>
    <p>Only one user at a time can import into the same project:</p>
    <ul>
      <li>If another user is already importing → "Another import is currently in progress for this project. Please try again in a few minutes." is displayed and the attempt is blocked.</li>
      <li>If a session is left hanging by abnormal termination (browser close, network outage), it is auto-recovered within 5 minutes, allowing others to import.</li>
    </ul>

    <h3>4-4. Recognized Column Names (case-insensitive; trailing <code>*</code> auto-stripped)</h3>
    <ul>
      <li>Required: <code>name</code></li>
      <li>Identifier: <code>key</code> — updates on match; creates when empty</li>
      <li>Common fields: <code>description</code>, <code>objective</code>, <code>precondition</code>, <code>type</code> (single / factor), <code>case type</code>, <code>priority</code>, <code>owner</code></li>
      <li>Folder: <code>folder</code>, <code>folder path</code> — <code>folder path</code> wins. If the path form (<code>A/B/C</code>) is used, nested folders are auto-created. If both are empty, a folder is auto-created from the file name</li>
      <li>Multi-value: <code>components</code>, <code>labels</code> — separated by comma or semicolon</li>
      <li>Steps: <code>step no</code>, <code>step</code> (or <code>step description</code>), <code>test data</code>, <code>expected result</code></li>
      <li>UDF: columns that match a User Defined Field name in Configuration are auto-mapped (checkbox / number / select types are converted as appropriate). If a required UDF is empty, the row is SKIPPED</li>
    </ul>

    <h3>4-5. Import Result Response</h3>
    <p>On completion, the result modal shows:</p>
    <ul>
      <li>Added — number of newly created TCs (green badge)</li>
      <li>Updated — number of TCs updated via key match (blue badge)</li>
      <li>Skipped — number of rows skipped due to validation failure (orange badge) — missing name, missing required UDF, etc.</li>
      <li>Failed — rows that failed on INSERT / UPDATE due to SQL errors (red badge, new)</li>
      <li>warnings categorized: Replaced (invalid value replaced with default), Excluded (unknown component / issue excluded), Skipped (SKIP reason), Other. Each item is shown with its row number.</li>
      <li>Download a text log via the Download Log button — all categories (Failed / Replaced / Excluded / Skipped / Other) are recorded with row numbers for external analysis.</li>
    </ul>
    <p>If a single import exceeds 5,000 rows, the entire import is rejected with the error "Import size exceeds maximum limit of 5000 test cases".</p>
    <aside className="guide-callout info">
      Processing 5,000 TCs: on average about 20–25 seconds (500-row batches × 10 ≈ 1.5–2 s per batch). Bulk INSERT + an in-memory folder cache process this without N+1 queries.
    </aside>

    <hr />

    <h2>5. Test Steps Format Conversion</h2>
    <p>The trickiest part is converting Test Steps.</p>

    <h3>Supported Formats</h3>
    <p>T-CAFE supports the following two Test Steps formats.</p>

    <h4>Format A: One row per step (CSV / Excel)</h4>
    <pre><code>{`TC Key | Step # | Step | Test Data | Expected
PROJ-1 | 1 | Open | - | Page loads
PROJ-1 | 2 | Type | username | Field filled`}</code></pre>
    <p>Steps belonging to the same TC should sit on consecutive rows. From the 2nd row, leave TC Name / Key blank so the row is recognized as a continuation of the previous TC.</p>

    <h4>Format B: JSON array (recommended by T-CAFE)</h4>
    <pre><code>{`[
 {"step": "Open page", "testData": "-", "expectedResult": "Page loads"},
 {"step": "Type username", "testData": "user1", "expectedResult": "Field filled"}
]`}</code></pre>
    <p>Placing an array in each TC's <code>testSteps</code> field when importing JSON is the clearest and safest delivery.</p>

    <h3>Conversion Tips</h3>
    <ul>
      <li>Joining all steps into a single cell with a delimiter (<code>|</code>, <code>;</code>, <code>\n</code>) is not supported → split by row</li>
      <li>To include line breaks inside a CSV cell, always wrap the value in quotes (recommended only for prose inside a step)</li>
      <li>Leave blank cells empty — tokens like <code>-</code> or <code>N/A</code> are stored as plain text</li>
    </ul>

    <hr />

    <h2>6. Import / Export Best Practices</h2>

    <h3>DO</h3>
    <ul>
      <li>Download a template from the Import Template Modal: it is pre-filled with the current project's Priority / Case Type / Component / UDF, which reduces validation errors</li>
      <li>Test with a small batch first: run an import test with 5–10 rows before a full run</li>
      <li>Export before importing: keep an Export of the current data as a backup</li>
      <li>Check encoding: UTF-8 (with BOM recommended for Korean)</li>
      <li>Double-check column names: use the recognized column names (4-4) for the header</li>
      <li>Use folder path: to preserve nested folder structures, write <code>A/B/C</code> in the <code>folder path</code> column</li>
      <li>Split at 5,000 rows: imports over 5,000 rows are rejected</li>
      <li>On failure, re-import the same file: idempotency makes it safe to retry after a partial failure</li>
    </ul>

    <h3>DON'T</h3>
    <ul>
      <li>A single file with more than 5,000 rows (auto-rejected)</li>
      <li>Importing the same row (same <code>key</code>) twice (merge mode updates on the second pass) — using idempotency intentionally is fine</li>
      <li>Importing before Configuration is set up (Priority / Case Type / Component) — many validation errors will occur</li>
      <li>Two people importing into the same project simultaneously — the second user is blocked</li>
      <li>Using folder names that contain the <code>/</code> character (incorrectly parsed as a separator)</li>
    </ul>

    <hr />

    <h2>7. Common Issues</h2>
    <table>
      <thead>
        <tr><th>Issue</th><th>Cause</th><th>Solution</th></tr>
      </thead>
      <tbody>
        <tr><td>Import button is not visible</td><td>Insufficient permission</td><td>Admin / Team Admin is required, or edit the Role and save</td></tr>
        <tr><td>"Another import is currently in progress" message</td><td>Another user is already importing into the same project</td><td>Wait for them to finish. For abnormal termination, it auto-recovers in 5 minutes</td></tr>
        <tr><td>"Import session has expired" message</td><td>The session heartbeat was lost for 5 minutes during import (network outage, etc.)</td><td>Re-import the same file (idempotency guarantee)</td></tr>
        <tr><td>Korean text is garbled</td><td>Encoding issue</td><td>Save as UTF-8 or UTF-8 BOM</td></tr>
        <tr><td>Some rows are Skipped</td><td>Missing name, missing required UDF, or validation failure</td><td>Check row numbers and reasons in the result modal's Skipped category, then fix those rows</td></tr>
        <tr><td>Some rows are Failed</td><td>SQL error (key collision, length exceeded, etc.)</td><td>Check row numbers and errors in the result modal's Failed category. Use Download Log for deeper analysis</td></tr>
        <tr><td>Priority / Case Type / Component changed to default</td><td>The file value is not in Configuration</td><td>See the Replaced category in the result modal. Define the item in Configuration, then re-import</td></tr>
        <tr><td>The same folder is not created twice (good behavior)</td><td>UNIQUE constraint blocks same-level duplicates</td><td>Intended — re-importing the same file leaves folders as is</td></tr>
        <tr><td>Nested folders are auto-created (good behavior)</td><td>The folder path column uses <code>A/B/C</code></td><td>Intended — all intermediate folders are auto-created parent-to-child</td></tr>
        <tr><td>"Import size exceeds maximum limit of 5000" error</td><td>A single file exceeds 5,000 rows</td><td>Split into multiple files and import sequentially</td></tr>
        <tr><td>Folder Path column exists but no folder is created</td><td>Wrong separator (supported: <code>/</code>, <code>{' > '}</code>)</td><td>Use <code>/</code> or <code>{' > '}</code>. Other separators (<code>\\</code>, <code>|</code>, etc.) are not recognized</td></tr>
        <tr><td>A TC with the same key is unexpectedly modified</td><td>Merge mode — key match triggers update (idempotent behavior)</td><td>To force creation as a new TC, leave the <code>key</code> column empty</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>8. Export Use Cases</h2>

    <h3>8-1. Weekly Report</h3>
    <ul>
      <li>Every Friday, Test Cases → Export → progress report</li>
    </ul>

    <h3>8-2. External Backup</h3>
    <ul>
      <li>Monthly: export all TCs to JSON and keep it in external storage</li>
    </ul>

    <h3>8-3. Sharing with Other Teams</h3>
    <ul>
      <li>Export a specific folder only → hand it to another team as Excel</li>
    </ul>

    <h3>8-4. Audit Evidence</h3>
    <ul>
      <li>Export all TCs at a point in time → audit evidence</li>
    </ul>

    <h3>8-5. Analysis</h3>
    <ul>
      <li>Export to CSV → analyze with Excel pivot tables</li>
    </ul>

    <hr />

    <h2>Next Steps</h2>
    <ul>
      <li><Link to="/support/guide/test-cases">05. Test Cases</Link></li>
      <li><Link to="/support/guide/test-reports">12. Test Reports</Link></li>
      <li><Link to="/support/guide/configuration">13. Configuration</Link></li>
    </ul>
  </article>
);

export default { ko: <ImportExport />, en: <ImportExportEn /> };
