document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 가져오기
    const mainScreen = document.getElementById('main-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const resultScreen = document.getElementById('result-screen');
    const fileUpload = document.getElementById('file-upload');
    const userPhoto = document.getElementById('user-photo');
    const scoreValue = document.getElementById('score-value');
    const characterDescription = document.getElementById('character-description');
    const rankNumber = document.getElementById('rank-number');
    const ageValue = document.getElementById('age-value');
    const phoneValue = document.getElementById('phone-value');
    const confessionValue = document.getElementById('confession-value');
    const followerValue = document.getElementById('follower-value');
    const retryBtn = document.getElementById('retry-btn');
    const shareBtn = document.getElementById('share-btn');
    const shareToast = document.getElementById('share-toast');
    
    // 남은 횟수 카운터
    let remainingAttempts = 5;
    
    // 파일 업로드 이벤트 리스너
    fileUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            
            // 이미지 파일인지 확인
            if (!file.type.match('image.*')) {
                alert('이미지 파일만 업로드 가능합니다.');
                return;
            }
            
            // 파일 크기 제한 (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('파일 크기는 5MB 이하여야 합니다.');
                return;
            }
            
            // 로딩 화면 표시
            mainScreen.style.display = 'none';
            loadingScreen.style.display = 'flex';
            
            // 이미지 미리보기 설정
            const reader = new FileReader();
            reader.onload = function(e) {
                userPhoto.src = e.target.result;
            };
            reader.readAsDataURL(file);
            
            // AI 분석 시뮬레이션 (실제로는 서버에서 처리)
            setTimeout(function() {
                // 결과 생성
                generateResults();
                
                // 로딩 화면 숨기고 결과 화면 표시
                loadingScreen.style.display = 'none';
                resultScreen.style.display = 'block';
                
                // 남은 횟수 감소
                remainingAttempts--;
                updateRemainingAttempts();
            }, 3000); // 3초 후 결과 표시
        }
    });
    
    // 다시하기 버튼 이벤트 리스너
    retryBtn.addEventListener('click', function() {
        if (remainingAttempts > 0) {
            // 결과 화면 숨기고 메인 화면 표시
            resultScreen.style.display = 'none';
            mainScreen.style.display = 'block';
            
            // 파일 입력 초기화
            fileUpload.value = '';
        } else {
            alert('오늘의 시도 횟수를 모두 사용하셨습니다.');
        }
    });
    
    // 공유하기 버튼 이벤트 리스너
    shareBtn.addEventListener('click', function() {
        // 현재 URL 복사
        const dummyUrl = window.location.href + '?result=' + generateRandomString(10);
        copyToClipboard(dummyUrl);
        
        // 토스트 메시지 표시
        shareToast.classList.add('show');
        setTimeout(function() {
            shareToast.classList.remove('show');
        }, 2000);
    });
    
    // 랜덤 결과 생성 함수
    function generateResults() {
        // 점수 (1.0 ~ 10.0)
        const score = (Math.random() * 9 + 1).toFixed(1);
        scoreValue.textContent = score;
        
        // 캐릭터 설명 (점수에 따라 다른 설명)
        const descriptions = [
            "교복 입고 편의점 알바생상",
            "인기 많은 대학 선배상",
            "친구들 사이에서 인기남상",
            "첫인상이 강렬한 카리스마상",
            "귀여운 동생 같은 상",
            "신뢰감 있는 직장인상"
        ];
        const descIndex = Math.floor(score / 2);
        characterDescription.textContent = descriptions[descIndex];
        
        // 순위 (랜덤)
        const totalUsers = 8176432;
        const rank = Math.floor(Math.random() * totalUsers) + 1;
        rankNumber.textContent = rank.toLocaleString('ko-KR');
        
        // 순위 마커 위치 조정
        const rankPercentage = (rank / totalUsers) * 100;
        document.querySelector('.rank-marker').style.left = rankPercentage + '%';
        
        // 예상 나이 (18 ~ 35)
        const age = Math.floor(Math.random() * 18) + 18;
        ageValue.textContent = age;
        
        // 번호 따인 횟수 (0 ~ 10)
        const phoneCount = Math.floor(Math.random() * 11);
        phoneValue.textContent = phoneCount;
        
        // 고백 받은 횟수 (0 ~ 20)
        const confessionCount = Math.floor(Math.random() * 21);
        confessionValue.textContent = confessionCount;
        
        // 인스타 팔로워 수 (100 ~ 5000)
        const followers = Math.floor(Math.random() * 4901) + 100;
        followerValue.textContent = followers;
    }
    
    // 남은 횟수 업데이트 함수
    function updateRemainingAttempts() {
        const countElements = document.querySelectorAll('.count');
        countElements.forEach(function(element) {
            element.textContent = remainingAttempts + '회 남음';
        });
    }
    
    // 클립보드에 텍스트 복사 함수
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
    
    // 랜덤 문자열 생성 함수 (공유 URL용)
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    
    // 초기 남은 횟수 표시
    updateRemainingAttempts();
});
