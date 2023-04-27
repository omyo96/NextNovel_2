package com.a509.service_payment.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponseDto {
    private String token;
    public TokenResponseDto fromEntity (String token){
        return TokenResponseDto
                .builder()
                .token(token)
                .build();
    }
}