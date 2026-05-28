import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: '일반',
    items: [
      {
        q: 'T-CAFE는 어떤 앱인가요?',
        a: <p>T-CAFE는 Atlassian Jira Cloud용 테스트 관리 앱입니다. 테스트 케이스, 테스트 플랜, 실행 결과, 리포트를 통합 관리할 수 있습니다. <strong>Factor Combination</strong>(조합 자동 생성), <strong>다국어 지원</strong>(한/영/일), <strong>역할 기반 권한 관리</strong> 등이 차별화 기능입니다.</p>,
      },
      {
        q: 'T-CAFE를 사용하려면 어떤 조건이 필요한가요?',
        a: <p>Atlassian Jira Cloud 활성 구독 + Jira 관리자 권한(앱 설치 시)이 필요합니다. 자체 호스팅 Jira(Server/DC)는 지원하지 않습니다.</p>,
      },
      {
        q: '어떤 언어를 지원하나요?',
        a: <p><strong>Auto / English / 한국어 / 日本語</strong> 4개 옵션을 제공합니다 (Auto는 브라우저/Jira 사용자 locale 추종). 우상단 언어 선택 메뉴에서 변경할 수 있습니다.</p>,
      },
      {
        q: 'T-CAFE의 데이터는 어디에 저장되나요?',
        a: <p>테스트 데이터와 첨부파일 모두 안전한 데이터센터에 저장됩니다. 자세한 내용은 <a href="https://t-cafe.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>를 참고하세요.</p>,
      },
    ],
  },
  {
    category: '설치 / 시작',
    items: [
      {
        q: 'T-CAFE 설치 방법은?',
        a: <p>Jira Cloud → 설정 → Apps → Find new apps → "T-CAFE" 검색 → Get it now. 자세한 내용은 <Link to="/support/guide/getting-started">01. 시작하기</Link> 참고.</p>,
      },
      {
        q: '설치 후 첫 사용자는 어떤 권한을 받나요?',
        a: <p>프로젝트의 첫 사용자는 자동으로 <strong>Admin</strong> 권한을 받습니다. 이후 가입자는 Tester 권한을 받습니다.</p>,
      },
      {
        q: '샘플 데이터는 어떻게 만드나요?',
        a: <p>Overview 페이지의 Welcome Banner에서 "<strong>샘플 데이터 생성</strong>" 버튼을 클릭하세요. <strong>Admin 권한</strong>이 필요합니다. 자세한 내용은 <Link to="/support/guide/getting-started">01. 시작하기</Link>.</p>,
      },
      {
        q: '샘플 데이터를 다시 만들 수 있나요?',
        a: <p>프로젝트에서 이미 한 번 생성을 한 적이 있다면 Welcome Banner 및 Create Sample Data 버튼은 영구 숨김됩니다. 재생성이 필요하면 관리자에게 문의해주세요.</p>,
      },
    ],
  },
  {
    category: '권한',
    items: [
      {
        q: '권한 종류는?',
        a: <p>기본 4가지 시스템 역할 — <strong>Admin</strong> / <strong>Team Admin</strong> / <strong>Tester</strong> / <strong>Developer</strong>. 프로젝트 필요에 따라 커스텀 역할을 추가로 생성할 수 있습니다. 자세한 매트릭스는 <Link to="/support/guide/permissions">02. 사용자 권한</Link> 참고.</p>,
      },
      {
        q: '본인 권한을 변경할 수 있나요?',
        a: <p>권한을 가진 Admin이라면 자기 자신의 권한/역할도 편집 페이지에서 조작할 수 있습니다. 다만 "프로젝트의 마지막 활성 Admin"을 자기 자신이 강등하거나 비활성화하려 하면 시스템이 자동으로 차단합니다.</p>,
      },
      {
        q: '마지막 Admin을 삭제할 수 있나요?',
        a: <p>아니요. 프로젝트의 마지막 활성 Admin은 삭제·비활성화·강등이 모두 차단됩니다.</p>,
      },
      {
        q: 'Configuration 탭이 보이지 않습니다',
        a: <p>Configuration 탭은 <strong>Admin 또는 Team Admin</strong> 권한일 때만 표시됩니다. Tester / Developer는 접근할 수 없습니다. 권한 변경이 필요하면 Admin에게 요청하세요.</p>,
      },
      {
        q: 'Tester 권한으로 TC를 만들 수 없나요?',
        a: <p>네. Tester의 <code>testCases</code> 권한은 <code>view: true, execute: true, export: true</code>만 활성되어 있으며 create/edit/delete/import/manageFolder는 모두 false입니다.</p>,
      },
      {
        q: '커스텀 역할을 만들 수 있나요?',
        a: <p>Configuration → User Permissions → Roles 탭에서 커스텀 역할을 생성하고 <strong>8개 기능 영역</strong>(overview / testCases / factorCombination / testPlans / reports / configuration / userManagement / attachments)의 권한을 세밀하게 설정할 수 있습니다. 시스템 역할(Admin, Team Admin, Tester, Developer)은 삭제할 수 없지만(권한 변경은 가능).</p>,
      },
      {
        q: '사용자를 비활성화할 수 있나요?',
        a: <p>Users 탭에서 Activate 토글을 OFF하면 해당 사용자의 permissions가 전부 false로 반환되어 실질적으로 모든 접근이 차단됩니다. 다시 ON하면 역할의 기본 권한이 즉시 복원됩니다. 비활성 사용자는 Status 필터를 Inactive로 변경하면 목록에 표시됩니다.</p>,
      },
    ],
  },
  {
    category: '테스트 케이스',
    items: [
      {
        q: 'TC와 TC Key의 차이는?',
        a: <p><strong>TC Key</strong>는 자동 부여되는 식별자(예: <code>PROJ-1</code>)이고, <strong>TC</strong>는 그 식별자에 연결된 실제 내용(이름, 설명, 스텝 등)입니다.</p>,
      },
      {
        q: '삭제한 TC를 복구할 수 있나요?',
        a: <p><strong>불가능</strong>합니다. 삭제 전에 백업(Export)을 권장합니다.</p>,
      },
      {
        q: '같은 이름의 TC를 여러 개 만들 수 있나요?',
        a: <p>가능하지만 권장하지 않습니다. 각 TC는 고유한 키로 구분되지만, 같은 이름이면 사용자가 헷갈릴 수 있습니다.</p>,
      },
      {
        q: 'TC 키를 변경할 수 있나요?',
        a: <p>변경할 수 없습니다. TC 키는 시스템이 자동 부여하며 영구적입니다.</p>,
      },
      {
        q: 'TC를 다른 프로젝트로 이동할 수 있나요?',
        a: <p>현재 버전에서는 직접 이동 기능이 없습니다. Export 후 대상 프로젝트에서 Import해야 합니다.</p>,
      },
      {
        q: 'Test Steps에 이미지를 넣을 수 있나요?',
        a: <p>Test Steps 셀은 텍스트 입력 필드라 이미지를 인라인으로 삽입할 수는 없습니다. 다만 <Link to="/support/guide/attachments">Attachments</Link>에 업로드한 파일의 <code>[ATTACHMENT:id:filename]</code> 태그를 Test Steps(Step / Test Data / Expected Result)뿐 아니라 Description / Precondition / UDF에 붙여넣으면, 보기 모드에서 자동으로 클릭 가능한 다운로드 링크로 변환됩니다.</p>,
      },
    ],
  },
  {
    category: 'Factor Combination',
    items: [
      {
        q: 'Factor Combination이란?',
        a: <p>여러 변수의 조합을 자동으로 생성해 TC를 대량 생성하는 기능입니다. 8개 경쟁 앱 중 <strong>T-CAFE만 가지고 있는 차별화 기능</strong>입니다. 자세한 내용은 <Link to="/support/guide/factor-combination">08. Factor Combination</Link>.</p>,
      },
      {
        q: 'Pairwise는 무엇인가요?',
        a: <p>모든 두 변수의 쌍이 한 번씩 등장하도록 최소 조합만 만드는 알고리즘입니다. Full Combination 대비 50~80% TC 수가 줄어들지만, 통계적으로 약 75%의 결함을 발견할 수 있습니다.</p>,
      },
      {
        q: 'Factor를 몇 개까지 만들 수 있나요?',
        a: <p>Factor 자체의 개수 제한은 없지만, <strong>시뮬레이션 결과 조합 수는 최대 5,000개로 안전망이 걸려 있어</strong> 초과 시 생성이 중단됩니다. 실무상 <strong>5~7개 이내</strong>의 Factor로 구성하고, 필요하면 Constraint로 불필요한 조합을 제거하는 것을 권장합니다.</p>,
      },
      {
        q: 'Factor Combination을 수정하면 기존 TC는 어떻게 되나요?',
        a: <p>초기 TC 생성은 Factor Combination 상세 화면의 <strong>Create Test Case</strong>(테스트 케이스 생성) 버튼을 사용하고, 이후 Details 탭에서 조합별 속성(이름·설명 등)을 바꾼 뒤 <strong>Apply</strong>(적용) 버튼으로 해당 TC들에 변경 사항을 반영합니다. 자세한 동작은 <Link to="/support/guide/factor-combination">08. Factor Combination</Link>.</p>,
      },
    ],
  },
  {
    category: '테스트 플랜',
    items: [
      {
        q: 'TC와 TP의 차이는?',
        a: <p>TC는 "무엇을 테스트할지" 정의하는 영구 자료이고, TP는 "이번에 실행할 TC들의 묶음"입니다. 한 TC가 여러 TP에 포함될 수 있습니다.</p>,
      },
      {
        q: 'TP에 추가한 후 원본 TC를 수정하면 실행 항목도 바뀌나요?',
        a: <p><strong>아니요</strong>. 실행 항목은 추가된 시점의 데이터가 보존됩니다. 원본 TC가 수정되어도 실행 항목은 변경되지 않습니다. 동기화하려면 실행 항목을 제거 후 다시 추가해야 합니다.</p>,
      },
      {
        q: '한 TP에 같은 TC를 여러 번 추가할 수 있나요?',
        a: <p>가능하지만 권장하지 않습니다. 같은 TC가 여러 번 실행되어 통계가 왜곡될 수 있습니다.</p>,
      },
      {
        q: 'TP를 끝내면 어떻게 처리해야 하나요?',
        a: <p>기본 제공 Plan Status는 <strong>Prepairing / Open / Completed</strong> 3종이며, 완료된 TP는 <strong>Completed</strong>로 변경하는 것을 권장합니다. 팀 내 절차가 별도로 필요하면 Configuration → Plan Status에서 커스텀 상태(예: Closed, Archived 등)를 추가해 사용하세요. 삭제는 감사 추적을 위해 권장하지 않습니다.</p>,
      },
    ],
  },
  {
    category: '테스트 실행',
    items: [
      {
        q: 'Tester 권한으로 실행이 안 됩니다',
        a: (
          <>
            <p>다음을 확인하세요:</p>
            <ol>
              <li>Tester 권한이 정확한지</li>
              <li>TP의 상태가 Open (또는 사용자 정의 진행 상태)인지</li>
              <li>Jira 프로젝트 접근 권한이 있는지</li>
            </ol>
          </>
        ),
      },
      {
        q: 'Pass / Fail / Block / Skip의 차이는?',
        a: (
          <ul>
            <li><strong>Pass</strong>: 모든 스텝이 기대 결과대로 정상 동작</li>
            <li><strong>Fail</strong>: 한 개 이상의 스텝에서 기대 결과와 다름</li>
            <li><strong>Block</strong>: 다른 문제로 실행 자체가 불가 (사전 조건 미충족 등)</li>
            <li><strong>Skip</strong>: 의도적으로 실행 안 함</li>
          </ul>
        ),
      },
      {
        q: 'Fail 시 Jira Issue를 만들 수 있나요?',
        a: <p>실행 항목 화면에서 <strong>Create Issue</strong> 버튼으로 Jira 이슈 생성 모달을 열 수 있습니다. Summary는 비어 있어 직접 입력해야 하며, Description에는 기본 템플릿이 채워진 상태로 표시됩니다. 완전 자동 생성은 아닙니다.</p>,
      },
      {
        q: '한 번에 여러 실행 항목의 상태를 변경할 수 있나요?',
        a: <p>아니요. 현재 버전의 bulk 작업은 <strong>이동(Move)</strong>과 <strong>삭제(Delete)</strong>만 제공하며, 여러 실행 항목의 Pass/Fail/Block/Skip 상태를 한 번에 바꾸는 Bulk Update는 제공하지 않습니다. 상태는 각 항목별로 개별 변경해야 합니다.</p>,
      },
      {
        q: '실행 결과를 자동화 도구에서 import할 수 있나요?',
        a: <p>현재 버전에서는 수동 입력만 지원합니다. CI/CD 자동화 결과 import는 향후 로드맵에 있습니다.</p>,
      },
    ],
  },
  {
    category: '첨부파일',
    items: [
      {
        q: '첨부파일은 어디에 저장되나요?',
        a: <p>안전한 데이터센터에 저장됩니다. 자세한 내용은 <Link to="/support/guide/attachments">14. 첨부파일</Link>.</p>,
      },
      {
        q: '파일 크기 제한은?',
        a: <p>프로젝트 합계 <strong>200 MB</strong>가 한도입니다 (프론트엔드 <code>MAX_STORAGE_SIZE</code>). 단일 파일 한도는 서버 정책에 따라 변동되며, 한도를 초과하면 업로드 시 "단일 파일 한도 초과" 에러가 표시됩니다. 자세한 내용은 <Link to="/support/guide/attachments">14. 첨부파일</Link>.</p>,
      },
      {
        q: '어떤 파일 형식을 지원하나요?',
        a: <p>이미지(PNG/JPG/GIF), 문서(PDF/DOC/XLS), 텍스트, 압축 등 일반적인 형식을 모두 지원합니다. 자세한 목록은 <Link to="/support/guide/attachments">14. 첨부파일</Link>.</p>,
      },
      {
        q: '첨부파일을 삭제하면 복구할 수 있나요?',
        a: <p><strong>불가능</strong>합니다. 삭제 전에 다운로드하여 백업하세요.</p>,
      },
    ],
  },
  {
    category: 'Import / Export',
    items: [
      {
        q: '다른 도구(Xray, Zephyr 등)에서 마이그레이션할 수 있나요?',
        a: <p>Import는 T-CAFE의 고정된 컬럼명(Folder, Folder Path, Key, Name, Description, Objective, Precondition, Type, Case Type, Priority, Owner, Components, Labels, UDF, Test Steps)을 기준으로 자동 인식합니다. <strong>별도의 컬럼 매핑 UI는 제공하지 않으므로</strong>, 타 도구에서 Export한 파일의 컬럼 헤더를 직접 편집해 T-CAFE 양식에 맞춘 뒤 Import해야 합니다. Import 버튼 클릭 시 표시되는 <strong>Import Template Modal</strong>에서 현재 프로젝트에 맞는 빈 템플릿을 다운로드받아 시작하는 것이 가장 안전합니다. 자세한 내용은 <Link to="/support/guide/import-export">09. Import / Export</Link>.</p>,
      },
      {
        q: 'Export 형식은?',
        a: <p>CSV, JSON, Excel(XLSX) 3가지를 지원합니다. 컬럼 순서는 Folder, Folder Path가 맨 앞에 배치되어 폴더 기준으로 정렬·필터링하기 쉽도록 되어있습니다. Folder Path는 <code>/</code> 구분자(예: <code>Authentication/Login/OAuth</code>)를 사용합니다.</p>,
      },
      {
        q: 'Import 시 한글이 깨집니다',
        a: <p>파일을 <strong>UTF-8 BOM</strong> 인코딩으로 저장하세요. Excel의 경우 "다른 이름으로 저장" → "CSV UTF-8 (쉼표로 구분)" 선택.</p>,
      },
      {
        q: '한 번에 몇 개의 TC를 Import할 수 있나요?',
        a: <p>한 번의 Import에서 <strong>최대 5,000개</strong>까지 처리됩니다(<code>MAX_IMPORT_SIZE</code> 한도). 5,000개 기준 약 20~25초 소요 (500개씩 batch 처리). 그 이상이면 파일을 나누어 Import해야 합니다. 부분 실패가 발생해도 <strong>같은 파일을 다시 Import하면 멱등성으로 안전하게 복구</strong>됩니다 (key 매칭으로 UPDATE만 발생).</p>,
      },
      {
        q: '같은 파일을 두 번 Import하면 데이터가 중복되나요?',
        a: <p>아니요. T-CAFE는 <strong>멱등성을 보장</strong>합니다. key가 일치하는 TC는 UPDATE만 발생하고 새 INSERT는 일어나지 않습니다. 폴더도 동일 경로(<code>folder path</code>)에 대해 재사용되어 중복 생성되지 않습니다 (DB UNIQUE 제약). 부분 실패 후 재 Import가 안전한 회복 방법입니다.</p>,
      },
      {
        q: '동시에 여러 사용자가 Import할 수 있나요?',
        a: <p>같은 프로젝트에 대해서는 <strong>한 번에 한 명만</strong> Import할 수 있습니다. 다른 사용자가 진행 중이면 "Another import is currently in progress for this project. Please try again in a few minutes." 메시지가 표시됩니다. 비정상 종료된 세션은 5분 이내 자동 회복되므로 잠시 후 재시도 가능합니다.</p>,
      },
      {
        q: 'Folder Path 컬럼에 어떻게 작성하나요?',
        a: <p><code>/</code> 구분자로 경로를 작성합니다 (예: <code>Authentication/Login/OAuth</code>). 모든 중간 폴더가 자동 생성되고 TC가 leaf 폴더에 배정됩니다. 기존 export 파일과의 호환을 위해 <code>{' > '}</code> 구분자도 인식됩니다. Folder Path가 비어 있으면 업로드한 파일명으로 폴더가 자동 생성됩니다.</p>,
      },
    ],
  },
  {
    category: '게시판',
    items: [
      {
        q: '게시판에 글을 쓸 수 있는 사람은?',
        a: <p><strong>Admin 전용</strong>입니다 (<code>overview.boardPost</code> 권한). Team Admin / Tester / Developer는 조회만 가능합니다.</p>,
      },
      {
        q: '게시글을 수정/삭제할 수 있나요?',
        a: <p>Admin만 가능합니다. 본인이 작성한 글이라도 Admin 권한이 없으면 수정/삭제 버튼이 보이지 않습니다.</p>,
      },
      {
        q: '카테고리가 있나요?',
        a: <p>현재 버전에서는 작성 화면에 카테고리 선택 필드가 없으며 모든 게시글이 <code>Notice</code> 카테고리로 저장됩니다. 별도의 "상단 고정(pin)" 기능도 없고 게시글은 작성일 기준 최신순으로만 정렬됩니다. 자세한 내용은 <Link to="/support/guide/board">04. 게시판</Link>.</p>,
      },
    ],
  },
  {
    category: '데이터 보안',
    items: [
      {
        q: 'T-CAFE는 데이터를 어떻게 보호하나요?',
        a: (
          <>
            <ul>
              <li><strong>데이터 보호</strong>: 민감한 테스트 데이터는 안전하게 보호되어 저장</li>
              <li><strong>권한 제어</strong>: 역할 기반 접근 제어 (Admin / Team Admin / Tester / Developer)</li>
              <li><strong>데이터 격리</strong>: 각 Jira 인스턴스 및 프로젝트별로 데이터 분리</li>
              <li><strong>웹 보안</strong>: 웹 표준 보안 기준을 준수합니다</li>
            </ul>
            <p>자세한 내용은 <a href="https://t-cafe.com/security-policy" target="_blank" rel="noopener noreferrer">Security Policy</a>.</p>
          </>
        ),
      },
      {
        q: 'T-CAFE가 우리 데이터를 AI 학습에 사용하나요?',
        a: <p><strong>아니요</strong>. T-CAFE는 고객 데이터를 어떠한 AI 또는 머신러닝 모델 학습에도 사용하지 않습니다.</p>,
      },
      {
        q: '데이터를 우리 회사 서버로 옮길 수 있나요?',
        a: <p>현재는 안전한 데이터센터에 저장됩니다. Self-hosting 옵션은 향후 검토 중입니다.</p>,
      },
      {
        q: 'GDPR을 준수하나요?',
        a: <p>네. T-CAFE는 GDPR, CCPA, LGPD를 모두 준수합니다. 자세한 내용은 <a href="https://t-cafe.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>와 <a href="https://t-cafe.com/dpa" target="_blank" rel="noopener noreferrer">Data Processing Addendum</a>.</p>,
      },
    ],
  },
  {
    category: '청구 / 라이선스',
    items: [
      {
        q: '가격은 어떻게 되나요?',
        a: <p>Atlassian Marketplace 리스팅 페이지에서 사용자 수에 따른 가격을 확인할 수 있습니다. T-CAFE는 Standard와 Advanced 두 가지 에디션을 제공합니다.</p>,
      },
      {
        q: '환불이 가능한가요?',
        a: <p>Atlassian Marketplace의 환불 정책을 따릅니다.</p>,
      },
      {
        q: '결제는 어떻게 이루어지나요?',
        a: <p>Atlassian Marketplace에서 처리됩니다. T-CAFE는 직접 결제를 받지 않습니다.</p>,
      },
      {
        q: 'Trial 기간이 있나요?',
        a: <p>네. Atlassian Marketplace 정책에 따라 30일 무료 평가가 가능합니다.</p>,
      },
    ],
  },
  {
    category: '기술 지원',
    items: [
      {
        q: '문제가 발생했을 때 어떻게 신고하나요?',
        a: <p>이메일로 신고해주세요: <strong>contact@coreprocess.co.kr</strong></p>,
      },
      {
        q: '기능 제안은 어디에 하나요?',
        a: <p>이메일로 보내주세요. 향후 로드맵에 검토합니다.</p>,
      },
      {
        q: '응답 시간은 어떻게 되나요?',
        a: <p>평일 기준 24~48시간 이내 응답을 목표로 합니다.</p>,
      },
      {
        q: '한국어 지원이 가능한가요?',
        a: <p>네. 이메일 문의는 한국어/영어 모두 가능합니다.</p>,
      },
      {
        q: 'SLA가 있나요?',
        a: <p>네. 자세한 내용은 <a href="/sla">Service Level Agreement (SLA)</a> 페이지에서 확인하실 수 있습니다. 대규모 도입 시 별도 협의도 가능합니다.</p>,
      },
    ],
  },
  {
    category: '호환성',
    items: [
      {
        q: '어떤 브라우저를 지원하나요?',
        a: <p>Chrome, Firefox, Safari, Edge의 최신 버전을 권장합니다. Internet Explorer는 지원하지 않습니다.</p>,
      },
      {
        q: '모바일에서 사용할 수 있나요?',
        a: <p>모바일 브라우저에서도 동작하지만, 데스크톱 환경에 최적화되어 있습니다. 모바일 전용 앱은 제공하지 않습니다.</p>,
      },
      {
        q: 'Jira Server / Data Center에서도 사용할 수 있나요?',
        a: <p>현재는 <strong>Jira Cloud 전용</strong>입니다. Server / DC 버전은 지원하지 않습니다.</p>,
      },
      {
        q: 'Atlassian Confluence에서도 사용할 수 있나요?',
        a: <p>아니요. T-CAFE는 Jira 전용입니다.</p>,
      },
    ],
  },
  {
    category: '향후 계획',
    items: [
      {
        q: 'AI 기능이 추가될 예정인가요?',
        a: <p>검토 중입니다. AI 기능이 추가되면 사용자에게 사전 공지하고, 데이터 사용 정책도 명확히 갱신할 예정입니다.</p>,
      },
      {
        q: 'REST API가 제공되나요?',
        a: <p>향후 로드맵에 있습니다. CI/CD 통합과 함께 출시 예정입니다.</p>,
      },
      {
        q: 'SOC 2 인증이 있나요?',
        a: <p>현재는 없습니다. 사용자 규모가 커지면 검토 예정입니다.</p>,
      },
      {
        q: '새 기능 요청을 어디에 할 수 있나요?',
        a: <p>이메일로 contact@coreprocess.co.kr에 보내주세요.</p>,
      },
    ],
  },
  {
    category: '기타',
    items: [
      {
        q: '가이드 외에 더 많은 자료가 있나요?',
        a: (
          <>
            <p>본 사용자 가이드 외에 다음을 참고하세요:</p>
            <ul>
              <li><a href="https://t-cafe.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://t-cafe.com/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
              <li><a href="https://t-cafe.com/dpa" target="_blank" rel="noopener noreferrer">Data Processing Addendum</a></li>
              <li><a href="https://t-cafe.com/sub-processors" target="_blank" rel="noopener noreferrer">Sub-processors</a></li>
              <li><a href="https://t-cafe.com/security-policy" target="_blank" rel="noopener noreferrer">Security Policy</a></li>
            </ul>
          </>
        ),
      },
      {
        q: 'T-CAFE 개발사는 누구인가요?',
        a: <p>COREPROCESS에서 개발하고 운영합니다.</p>,
      },
      {
        q: '본 가이드는 얼마나 자주 업데이트되나요?',
        a: <p>새 기능 출시 또는 정책 변경 시 업데이트됩니다. 큰 변경이 있을 경우 게시판으로 공지합니다.</p>,
      },
    ],
  },
];

const faqDataEn = [
  {
    category: 'General',
    items: [
      {
        q: 'What is T-CAFE?',
        a: <p>T-CAFE is a test management app for Atlassian Jira Cloud. It unifies test cases, test plans, execution results, and reports. Distinctive features include <strong>Factor Combination</strong> (auto-generating combinations), <strong>multilingual support</strong> (Korean / English / Japanese), and <strong>role-based access control</strong>.</p>,
      },
      {
        q: 'What do I need to use T-CAFE?',
        a: <p>An active Atlassian Jira Cloud subscription and Jira admin permission (for app installation). Self-hosted Jira (Server / Data Center) is not supported.</p>,
      },
      {
        q: 'Which languages are supported?',
        a: <p>Four options are available: <strong>Auto / English / 한국어 / 日本語</strong> (Auto follows the browser / Jira user locale). Switch via the language menu in the top-right.</p>,
      },
      {
        q: 'Where is my T-CAFE data stored?',
        a: <p>Both test data and attachments are stored in a secure data center. See the <a href="https://t-cafe.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> for details.</p>,
      },
    ],
  },
  {
    category: 'Install / Start',
    items: [
      {
        q: 'How do I install T-CAFE?',
        a: <p>Jira Cloud → Settings → Apps → Find new apps → search "T-CAFE" → Get it now. See <Link to="/support/guide/getting-started">01. Getting Started</Link> for details.</p>,
      },
      {
        q: 'What role does the first user receive?',
        a: <p>The first user in a project is automatically assigned <strong>Admin</strong>. Later users are assigned Tester.</p>,
      },
      {
        q: 'How do I create sample data?',
        a: <p>Click the "<strong>Create Sample Data</strong>" button on the Welcome Banner of the Overview page. <strong>Admin permission</strong> is required. See <Link to="/support/guide/getting-started">01. Getting Started</Link> for details.</p>,
      },
      {
        q: 'Can sample data be generated again?',
        a: <p>If a project has generated sample data before, the Welcome Banner and the Create Sample Data button are hidden permanently. If regeneration is needed, please contact your administrator.</p>,
      },
    ],
  },
  {
    category: 'Permissions',
    items: [
      {
        q: 'What are the roles?',
        a: <p>Four default system roles — <strong>Admin</strong> / <strong>Team Admin</strong> / <strong>Tester</strong> / <strong>Developer</strong>. You can also create custom roles to fit the project. See <Link to="/support/guide/permissions">02. User Permissions</Link> for the full matrix.</p>,
      },
      {
        q: 'Can I change my own role?',
        a: <p>If you have Admin permission, you can edit your own role / permissions on the edit page. The system does block an Admin from demoting or deactivating themselves if they are the project's "last active Admin".</p>,
      },
      {
        q: 'Can the last Admin be deleted?',
        a: <p>No. Deletion, deactivation, and demotion are all blocked for the project's last active Admin.</p>,
      },
      {
        q: 'The Configuration tab is not visible',
        a: <p>The Configuration tab is shown only to <strong>Admin or Team Admin</strong>. Tester / Developer cannot access it. If you need a role change, ask an Admin.</p>,
      },
      {
        q: 'Cannot Testers create TCs?',
        a: <p>Correct. A Tester's <code>testCases</code> permission only enables <code>view: true, execute: true, export: true</code>, with create / edit / delete / import / manageFolder all false.</p>,
      },
      {
        q: 'Can I create custom roles?',
        a: <p>Yes. In Configuration → User Permissions → Roles, create custom roles and set fine-grained permissions across the <strong>8 feature areas</strong> (overview / testCases / factorCombination / testPlans / reports / configuration / userManagement / attachments). System roles (Admin, Team Admin, Tester, Developer) cannot be deleted (but their permissions can be changed).</p>,
      },
      {
        q: 'Can I deactivate a user?',
        a: <p>Yes. Turning the Activate toggle OFF on the Users tab returns all of that user's permissions as false, effectively blocking all access. Turning it back ON instantly restores the role's default permissions. Switch the Status filter to Inactive to list deactivated users.</p>,
      },
    ],
  },
  {
    category: 'Test Cases',
    items: [
      {
        q: 'What is the difference between a TC and a TC Key?',
        a: <p>A <strong>TC Key</strong> is an auto-assigned identifier (e.g., <code>PROJ-1</code>), while a <strong>TC</strong> is the actual content (name, description, steps, etc.) linked to that identifier.</p>,
      },
      {
        q: 'Can a deleted TC be recovered?',
        a: <p><strong>No</strong>. Back up (Export) before deleting.</p>,
      },
      {
        q: 'Can I create multiple TCs with the same name?',
        a: <p>Yes, but it is not recommended. Each TC is uniquely identified by its key, but identical names can confuse users.</p>,
      },
      {
        q: 'Can TC keys be changed?',
        a: <p>No. The TC key is auto-assigned and permanent.</p>,
      },
      {
        q: 'Can a TC be moved to another project?',
        a: <p>The current version has no direct move feature. Export and then Import into the target project.</p>,
      },
      {
        q: 'Can I embed images in Test Steps?',
        a: <p>Test Step cells are text inputs, so inline images cannot be inserted. However, you can paste the <code>[ATTACHMENT:id:filename]</code> tag of a file uploaded to <Link to="/support/guide/attachments">Attachments</Link> into Test Steps (Step / Test Data / Expected Result), Description, Precondition, or UDFs, and it will be automatically turned into a clickable download link in view mode.</p>,
      },
    ],
  },
  {
    category: 'Factor Combination',
    items: [
      {
        q: 'What is Factor Combination?',
        a: <p>A feature that bulk-creates TCs by auto-generating combinations of multiple variables. It is a <strong>differentiator unique to T-CAFE</strong> among the 8 competing apps. See <Link to="/support/guide/factor-combination">08. Factor Combination</Link> for details.</p>,
      },
      {
        q: 'What is Pairwise?',
        a: <p>An algorithm that builds a minimal set of combinations so that every pair of any two variables appears at least once. TC count drops by 50–80% vs. Full Combination, while still catching roughly 75% of defects statistically.</p>,
      },
      {
        q: 'How many Factors can I define?',
        a: <p>There is no hard limit on Factor count itself, but <strong>the number of generated combinations is capped at 5,000 as a safety net</strong> — generation halts when exceeded. In practice, keep Factors to <strong>5–7</strong> and use Constraints to remove unnecessary combinations.</p>,
      },
      {
        q: 'What happens to existing TCs when I edit a Factor Combination?',
        a: <p>Create the initial TCs with the <strong>Create Test Case</strong> button on the Factor Combination detail screen. To change per-combination properties (name, description, etc.) afterward, edit on the Details tab and apply the changes to those TCs with the <strong>Apply</strong> button. See <Link to="/support/guide/factor-combination">08. Factor Combination</Link> for full behavior.</p>,
      },
    ],
  },
  {
    category: 'Test Plans',
    items: [
      {
        q: 'What is the difference between a TC and a TP?',
        a: <p>A TC is a permanent artifact defining "what to test", while a TP is "a bundle of TCs to run this time". A single TC can belong to many TPs.</p>,
      },
      {
        q: 'If I edit the source TC after adding it to a TP, does the execution item change?',
        a: <p><strong>No</strong>. The execution item preserves the data at the moment of addition. Even if the source TC is edited, the execution item does not change. To sync, remove the execution item and re-add it.</p>,
      },
      {
        q: 'Can I add the same TC to a TP multiple times?',
        a: <p>It is possible but not recommended. Running the same TC several times can skew stats.</p>,
      },
      {
        q: 'What should I do after a TP is finished?',
        a: <p>The default Plan Statuses are <strong>Prepairing / Open / Completed</strong>, and it is recommended to change completed TPs to <strong>Completed</strong>. If your team needs a separate workflow, add custom statuses (e.g., Closed, Archived) in Configuration → Plan Status. Deletion is not recommended, to preserve audit trails.</p>,
      },
    ],
  },
  {
    category: 'Test Execution',
    items: [
      {
        q: 'I cannot execute as a Tester',
        a: (
          <>
            <p>Check the following:</p>
            <ol>
              <li>That the Tester role is correct</li>
              <li>That the TP is in Open (or a custom in-progress status)</li>
              <li>That you have Jira project access</li>
            </ol>
          </>
        ),
      },
      {
        q: 'What is the difference between Pass / Fail / Block / Skip?',
        a: (
          <ul>
            <li><strong>Pass</strong>: every step worked as expected</li>
            <li><strong>Fail</strong>: at least one step differed from the expected result</li>
            <li><strong>Block</strong>: couldn't execute at all due to other issues (unmet preconditions, etc.)</li>
            <li><strong>Skip</strong>: intentionally not executed</li>
          </ul>
        ),
      },
      {
        q: 'Can I create a Jira issue when a test fails?',
        a: <p>On the execution-item screen, open the Jira issue creation modal with the <strong>Create Issue</strong> button. Summary is empty and must be filled in; Description is pre-populated with a default template. It is not fully automatic.</p>,
      },
      {
        q: 'Can I change the status of many execution items at once?',
        a: <p>No. The current version's bulk actions are limited to <strong>Move</strong> and <strong>Delete</strong>. There is no bulk Pass / Fail / Block / Skip update. Status is changed per item.</p>,
      },
      {
        q: 'Can I import results from automation tools?',
        a: <p>Only manual entry is supported in the current version. Importing CI/CD automation results is on the roadmap.</p>,
      },
    ],
  },
  {
    category: 'Attachments',
    items: [
      {
        q: 'Where are attachments stored?',
        a: <p>In a secure data center. See <Link to="/support/guide/attachments">14. Attachments</Link> for details.</p>,
      },
      {
        q: 'What is the file size limit?',
        a: <p>The project total is <strong>200 MB</strong> (frontend <code>MAX_STORAGE_SIZE</code>). The single-file limit varies by server policy; when exceeded, a "single-file limit exceeded" error is shown on upload. See <Link to="/support/guide/attachments">14. Attachments</Link> for details.</p>,
      },
      {
        q: 'Which file formats are supported?',
        a: <p>Common formats — images (PNG / JPG / GIF), documents (PDF / DOC / XLS), text, archives, and more — are all supported. See <Link to="/support/guide/attachments">14. Attachments</Link> for the list.</p>,
      },
      {
        q: 'Can a deleted attachment be recovered?',
        a: <p><strong>No</strong>. Download and back up before deleting.</p>,
      },
    ],
  },
  {
    category: 'Import / Export',
    items: [
      {
        q: 'Can I migrate from other tools (Xray, Zephyr, etc.)?',
        a: <p>Import auto-recognizes T-CAFE's fixed column names (Folder, Folder Path, Key, Name, Description, Objective, Precondition, Type, Case Type, Priority, Owner, Components, Labels, UDF, Test Steps). <strong>There is no separate column-mapping UI</strong>, so edit the column headers of a file exported from another tool to match T-CAFE's format before importing. The safest start is the <strong>Import Template Modal</strong> shown when you click the Import button — download an empty template tailored to the current project. See <Link to="/support/guide/import-export">09. Import / Export</Link> for details.</p>,
      },
      {
        q: 'What are the Export formats?',
        a: <p>Three formats: CSV, JSON, and Excel (XLSX). Column order places Folder and Folder Path at the very front, making it easy to sort and filter by folder. Folder Path uses the <code>/</code> separator (e.g., <code>Authentication/Login/OAuth</code>).</p>,
      },
      {
        q: 'Korean characters are garbled on Import',
        a: <p>Save the file as <strong>UTF-8 BOM</strong>. In Excel, use "Save As" → "CSV UTF-8 (Comma delimited)".</p>,
      },
      {
        q: 'How many TCs can I import at once?',
        a: <p>A single Import processes up to <strong>5,000 rows</strong> (<code>MAX_IMPORT_SIZE</code> limit). 5,000 rows take about 20–25 seconds (500-row batches). Beyond that, split into multiple files. Even if there is a partial failure, <strong>re-importing the same file recovers safely thanks to idempotency</strong> (key match triggers UPDATE only).</p>,
      },
      {
        q: 'Does importing the same file twice duplicate data?',
        a: <p>No. T-CAFE <strong>guarantees idempotency</strong>. TCs with matching keys only UPDATE — no new INSERTs. Folders with the same <code>folder path</code> are reused (enforced by a DB UNIQUE constraint). Re-import after a partial failure is the safe recovery path.</p>,
      },
      {
        q: 'Can multiple users import at the same time?',
        a: <p><strong>Only one user at a time</strong> can import into the same project. If another user is in progress, the message "Another import is currently in progress for this project. Please try again in a few minutes." is shown. Abnormally terminated sessions auto-recover within 5 minutes, so retry works after a short wait.</p>,
      },
      {
        q: 'How do I write the Folder Path column?',
        a: <p>Use <code>/</code> as the separator (e.g., <code>Authentication/Login/OAuth</code>). All intermediate folders are auto-created and the TC is placed in the leaf folder. For compatibility with legacy exports, <code>{' > '}</code> is also recognized. If Folder Path is empty, a folder is auto-created from the uploaded file name.</p>,
      },
    ],
  },
  {
    category: 'Board',
    items: [
      {
        q: 'Who can post on the Board?',
        a: <p><strong>Admin only</strong> (the <code>overview.boardPost</code> permission). Team Admin / Tester / Developer can only view.</p>,
      },
      {
        q: 'Can I edit / delete a post?',
        a: <p>Only Admin can. Even on your own post, the edit / delete buttons are hidden without Admin permission.</p>,
      },
      {
        q: 'Are there categories?',
        a: <p>The current version's write form has no category picker, and every post is stored in the <code>Notice</code> category. There is no "pin to top" feature either — posts are sorted by newest created date only. See <Link to="/support/guide/board">04. Board</Link> for details.</p>,
      },
    ],
  },
  {
    category: 'Data Security',
    items: [
      {
        q: 'How does T-CAFE protect data?',
        a: (
          <>
            <ul>
              <li><strong>Data protection</strong>: sensitive test data is stored with secure protection</li>
              <li><strong>Access control</strong>: role-based (Admin / Team Admin / Tester / Developer)</li>
              <li><strong>Isolation</strong>: data is isolated per Jira instance and per project</li>
              <li><strong>Web security</strong>: complies with web-standard security baselines</li>
            </ul>
            <p>See the <a href="https://t-cafe.com/security-policy" target="_blank" rel="noopener noreferrer">Security Policy</a> for details.</p>
          </>
        ),
      },
      {
        q: 'Does T-CAFE use our data to train AI?',
        a: <p><strong>No</strong>. T-CAFE does not use customer data to train any AI or machine learning models.</p>,
      },
      {
        q: 'Can we move data to our own servers?',
        a: <p>Data is currently stored in a secure data center. Self-hosting is under future consideration.</p>,
      },
      {
        q: 'Is T-CAFE GDPR compliant?',
        a: <p>Yes. T-CAFE complies with GDPR, CCPA, and LGPD. See the <a href="https://t-cafe.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and the <a href="https://t-cafe.com/dpa" target="_blank" rel="noopener noreferrer">Data Processing Addendum</a>.</p>,
      },
    ],
  },
  {
    category: 'Billing / License',
    items: [
      {
        q: 'How is T-CAFE priced?',
        a: <p>See per-user pricing on the Atlassian Marketplace listing page. T-CAFE offers Standard and Advanced editions.</p>,
      },
      {
        q: 'Are refunds possible?',
        a: <p>Refunds follow the Atlassian Marketplace policy.</p>,
      },
      {
        q: 'How does billing work?',
        a: <p>Billing is handled by the Atlassian Marketplace. T-CAFE does not process payments directly.</p>,
      },
      {
        q: 'Is there a trial period?',
        a: <p>Yes — a 30-day free evaluation per the Atlassian Marketplace policy.</p>,
      },
    ],
  },
  {
    category: 'Technical Support',
    items: [
      {
        q: 'How do I report an issue?',
        a: <p>Email us at <strong>contact@coreprocess.co.kr</strong>.</p>,
      },
      {
        q: 'Where can I suggest features?',
        a: <p>Email your suggestion. We review for future roadmap consideration.</p>,
      },
      {
        q: 'What is the response time?',
        a: <p>We aim to respond within 24–48 hours on business days.</p>,
      },
      {
        q: 'Is Korean support available?',
        a: <p>Yes. Email inquiries in either Korean or English are welcome.</p>,
      },
      {
        q: 'Is there an SLA?',
        a: <p>Yes. Please see our <a href="/sla">Service Level Agreement (SLA)</a> page for details. Custom terms for larger deployments can also be discussed separately.</p>,
      },
    ],
  },
  {
    category: 'Compatibility',
    items: [
      {
        q: 'Which browsers are supported?',
        a: <p>Latest versions of Chrome, Firefox, Safari, and Edge are recommended. Internet Explorer is not supported.</p>,
      },
      {
        q: 'Can I use it on mobile?',
        a: <p>It runs in mobile browsers, but it is optimized for desktop. There is no mobile-only app.</p>,
      },
      {
        q: 'Can I use it on Jira Server / Data Center?',
        a: <p>Currently <strong>Jira Cloud only</strong>. Server / DC editions are not supported.</p>,
      },
      {
        q: 'Can I use it on Atlassian Confluence?',
        a: <p>No. T-CAFE is Jira-only.</p>,
      },
    ],
  },
  {
    category: 'Roadmap',
    items: [
      {
        q: 'Will AI features be added?',
        a: <p>Under consideration. If AI features are added, we will notify users in advance and clearly update our data-usage policy.</p>,
      },
      {
        q: 'Is there a REST API?',
        a: <p>On the future roadmap, planned together with CI/CD integration.</p>,
      },
      {
        q: 'Is there SOC 2 certification?',
        a: <p>Not currently. We will review it as the user base grows.</p>,
      },
      {
        q: 'Where can I request new features?',
        a: <p>Email contact@coreprocess.co.kr.</p>,
      },
    ],
  },
  {
    category: 'Other',
    items: [
      {
        q: 'Is there more material beyond this guide?',
        a: (
          <>
            <p>Beyond this user guide, see:</p>
            <ul>
              <li><a href="https://t-cafe.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://t-cafe.com/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
              <li><a href="https://t-cafe.com/dpa" target="_blank" rel="noopener noreferrer">Data Processing Addendum</a></li>
              <li><a href="https://t-cafe.com/sub-processors" target="_blank" rel="noopener noreferrer">Sub-processors</a></li>
              <li><a href="https://t-cafe.com/security-policy" target="_blank" rel="noopener noreferrer">Security Policy</a></li>
            </ul>
          </>
        ),
      },
      {
        q: 'Who develops T-CAFE?',
        a: <p>Developed and operated by COREPROCESS.</p>,
      },
      {
        q: 'How often is this guide updated?',
        a: <p>It is updated on feature releases or policy changes. For major changes, we also announce on the Board.</p>,
      },
    ],
  },
];

const FAQ_STRINGS = {
  ko: {
    title: '15. 자주 묻는 질문 (FAQ)',
    lead: 'T-CAFE 사용 중 자주 묻는 질문과 답변을 정리했습니다. 검색하거나 카테고리에서 찾아보세요.',
    searchPlaceholder: '질문 또는 답변에서 검색...',
    clearSearch: '검색어 지우기',
    expandAll: '모두 펼치기',
    collapseAll: '모두 접기',
    emptyLine1: '검색 결과가 없습니다.',
    emptyLine2: '다른 키워드로 시도하거나, 답을 찾을 수 없으면 아래 이메일로 문의해주세요.',
    contactTitle: '이 페이지에 답이 없다면?',
    contactEmailPrefix: '이메일',
    contactEmailSuffix: ' 으로 문의해주세요.',
    contactHint: '문의 시 다음 정보를 함께 보내주시면 빠른 응답이 가능합니다:',
    contactItems: [
      'T-CAFE 사용 환경 (Jira Cloud URL)',
      '발생한 문제의 구체적 설명',
      '재현 단계',
      '스크린샷 또는 에러 메시지',
      '사용 중인 브라우저',
      '사용자 권한 (Admin / Team Admin / Tester / Developer)',
    ],
  },
  en: {
    title: '15. Frequently Asked Questions (FAQ)',
    lead: 'Common questions and answers about using T-CAFE. Search or browse by category.',
    searchPlaceholder: 'Search questions or answers...',
    clearSearch: 'Clear search',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    emptyLine1: 'No results found.',
    emptyLine2: "Try different keywords, or contact us by email below if you can't find an answer.",
    contactTitle: 'Not finding your answer here?',
    contactEmailPrefix: 'Email',
    contactEmailSuffix: ' with any question.',
    contactHint: 'Including the following with your message helps us respond faster:',
    contactItems: [
      'Your T-CAFE environment (Jira Cloud URL)',
      'A specific description of the problem',
      'Reproduction steps',
      'Screenshots or error messages',
      'Browser in use',
      'User role (Admin / Team Admin / Tester / Developer)',
    ],
  },
};

const extractText = (node) => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(' ');
  if (node.props && node.props.children !== undefined) return extractText(node.props.children);
  return '';
};

const FAQView = ({ data, strings, totalCount }) => {
  const [search, setSearch] = useState('');
  const [openKeys, setOpenKeys] = useState(() => new Set());

  const norm = (s) => s.toLowerCase().normalize('NFKC');
  const query = norm(search.trim());

  const sectionsWithIndex = useMemo(() => {
    return data.map((section, sIdx) => ({
      ...section,
      sIdx,
      items: section.items.map((item, iIdx) => ({
        ...item,
        key: `${sIdx}-${iIdx}`,
        searchText: norm(`${item.q} ${extractText(item.a)}`),
      })),
    }));
  }, [data]);

  const filteredSections = useMemo(() => {
    if (!query) return sectionsWithIndex;
    return sectionsWithIndex
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.searchText.includes(query)),
      }))
      .filter((section) => section.items.length > 0);
  }, [sectionsWithIndex, query]);

  const totalMatches = filteredSections.reduce((sum, s) => sum + s.items.length, 0);

  const toggleItem = (key) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const expandAll = () => {
    const all = new Set();
    filteredSections.forEach((s) => s.items.forEach((i) => all.add(i.key)));
    setOpenKeys(all);
  };
  const collapseAll = () => setOpenKeys(new Set());

  return (
    <article className="guide-article faq-article">
      <h1>{strings.title}</h1>
      <p className="guide-lead">{strings.lead}</p>

      <div className="faq-controls">
        <div className="faq-search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="faq-search-input"
            placeholder={strings.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button type="button" className="faq-search-clear" onClick={() => setSearch('')} aria-label={strings.clearSearch}>×</button>
          )}
        </div>
        <div className="faq-actions">
          <span className="faq-count">{totalMatches} / {totalCount}</span>
          <button type="button" className="faq-action-btn" onClick={expandAll} disabled={totalMatches === 0}>{strings.expandAll}</button>
          <button type="button" className="faq-action-btn" onClick={collapseAll} disabled={openKeys.size === 0}>{strings.collapseAll}</button>
        </div>
      </div>

      {filteredSections.length === 0 ? (
        <div className="faq-empty">
          <p>{strings.emptyLine1}</p>
          <p>{strings.emptyLine2}</p>
        </div>
      ) : (
        filteredSections.map((section) => (
          <section key={section.sIdx} className="faq-section">
            <h2 className="faq-section-title">{section.category}</h2>
            <div className="faq-list">
              {section.items.map((item) => {
                const isOpen = openKeys.has(item.key);
                return (
                  <div key={item.key} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => toggleItem(item.key)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-prefix">Q.</span>
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-toggle" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <span className="faq-a-prefix">A.</span>
                        <div className="faq-a-content">{item.a}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}

      <section className="faq-contact">
        <h2>{strings.contactTitle}</h2>
        <p><strong>{strings.contactEmailPrefix}</strong>: <a href="mailto:contact@coreprocess.co.kr">contact@coreprocess.co.kr</a>{strings.contactEmailSuffix}</p>
        <p>{strings.contactHint}</p>
        <ul>
          {strings.contactItems.map((li) => <li key={li}>{li}</li>)}
        </ul>
      </section>
    </article>
  );
};

const countItems = (data) => data.reduce((sum, s) => sum + s.items.length, 0);

const FAQ = () => <FAQView data={faqData} strings={FAQ_STRINGS.ko} totalCount={countItems(faqData)} />;
const FAQEn = () => <FAQView data={faqDataEn} strings={FAQ_STRINGS.en} totalCount={countItems(faqDataEn)} />;

export default { ko: <FAQ />, en: <FAQEn /> };
