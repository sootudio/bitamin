package com.saessakmaeul.bitamin.member;

import com.saessakmaeul.bitamin.member.dto.MemberDTO;
import com.saessakmaeul.bitamin.member.entity.Member;
import com.saessakmaeul.bitamin.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.context.annotation.Lazy;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/members")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@Tag(name = "Member Controller", description = "회원 관리하는 컨트롤러")
public class MemberController {
    private final MemberService memberService;

    public MemberController(@Lazy MemberService memberService) {
        this.memberService = memberService;
    }

    @Operation(summary = "회원가입", description = "")
    @PostMapping("/register")
    public Long register(@RequestBody MemberDTO user) {
        return memberService.register(user);
    }

    @Operation(summary = "회원 한명 조회", description = "")
    @GetMapping("/get-member")
    public ResponseEntity<Member> getMemberByEmail(@RequestParam String email) {
        Optional<Member> member = memberService.getMember(email);
        return member.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Operation(summary = "회원 목록 조회", description = "모든 회원 정보를 조회합니다.")
    @GetMapping("/list")
    public ResponseEntity<List<MemberDTO>> getMemberList() {
        List<MemberDTO> members = memberService.getMemberList();
        return ResponseEntity.ok(members);
    }
}
