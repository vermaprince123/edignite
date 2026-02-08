"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { User, Mail, Phone, MessageSquare, Send, Users, Lightbulb, Heart, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ngoInfo } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

const volunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

// Web3Forms Access Key - Get your free access key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

// hCaptcha Site Key for Web3Forms (free plan)
const HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

export function Volunteer() {
  const { t } = useLanguage();
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  });

  const onHCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      setSubmitStatus("idle");
      
      // Validate hCaptcha
      if (!captchaToken) {
        setSubmitStatus("error");
        setSubmitMessage("Please complete the captcha verification.");
        setTimeout(() => {
          setSubmitStatus("idle");
          setSubmitMessage("");
        }, 3000);
        return;
      }
      
      // Using Web3Forms API (free, unlimited emails)
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message);
      formData.append("subject", "New Volunteer Application - Edignite");
      formData.append("from_name", "Edignite Volunteer Form");
      formData.append("to_email", ngoInfo.email);
      formData.append("h-captcha-response", captchaToken);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setSubmitMessage("Thank you for your interest! We'll contact you soon.");
        reset();
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
          setSubmitMessage("");
        }, 5000);
      } else {
        throw new Error(result.message || "Failed to send application");
      }
    } catch (error) {
      console.error("Error sending volunteer application:", error);
      setSubmitStatus("error");
      setSubmitMessage("Sorry, there was an error submitting your application. Please try again or contact us directly at " + ngoInfo.email);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 5000);
    }
  };

  const benefits = [
    {
      icon: Heart,
      titleKey: "makeImpact",
      descriptionKey: "makeImpactText",
    },
    {
      icon: Lightbulb,
      titleKey: "learnGrow",
      descriptionKey: "learnGrowText",
    },
    {
      icon: Users,
      titleKey: "buildCommunity",
      descriptionKey: "buildCommunityText",
    },
    {
      icon: Calendar,
      titleKey: "flexibleCommitment",
      descriptionKey: "flexibleCommitmentText",
    },
  ];

  return (
    <section id="volunteer" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("volunteer.title")}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("volunteer.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="border h-full">
              <CardHeader>
                <CardTitle className="text-2xl">{t("volunteer.whyVolunteer")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{t(`volunteer.${benefit.titleKey}`)}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(`volunteer.${benefit.descriptionKey}`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border">
              <CardHeader>
                <CardTitle>{t("volunteer.joinUs")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t("volunteer.name")}
                    </label>
                    <input
                      id="name"
                      {...register("name")}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t("volunteer.email")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t("volunteer.phone")}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="+91-XXXXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {t("volunteer.whyVolunteerQuestion")}
                    </label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-all"
                      placeholder="Tell us about yourself and your interests..."
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  {/* hCaptcha */}
                  <div className="flex justify-center">
                    <HCaptcha
                      ref={captchaRef}
                      sitekey={HCAPTCHA_SITE_KEY}
                      onVerify={onHCaptchaChange}
                      reCaptchaCompat={false}
                    />
                  </div>
                  {!captchaToken && submitStatus === "error" && submitMessage.includes("captcha") && (
                    <p className="text-sm text-destructive text-center">Please complete the captcha to continue.</p>
                  )}

                  {/* Submit Status Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{submitMessage}</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
                      <XCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{submitMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Send className="mr-2 h-4 w-4 animate-pulse" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t("volunteer.submit")}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    {t("volunteer.orJoin")}{" "}
                    <a
                      href={ngoInfo.volunteerForm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      {t("volunteer.clickHere")}
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
