import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Mail, MessageSquare, User, Send, CheckCircle2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState<FormData[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store submission in local state
    setSubmissions(prev => [...prev, { ...data, timestamp: new Date().toISOString() }]);
    
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="w-[80%] ">
      <section className="w-full max-w-7xl mx-auto py-20">
        <div className="text-left mb-16">
          <p className="text-[#ead3c1] text-xl mb-2">{t('contact.sectionLabel')}</p>
          <h1 className="text-5xl font-semibold text-[#FCF7F8] leading-tight">{t('contact.title')}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-red-100/60 leading-relaxed text-lg">
                {t('contact.description1')}
              </p>
              <p className="text-red-100/60 leading-relaxed">
                {t('contact.description2')}
              </p>
            </div>
            {/* Show submission count */}
            {submissions.length > 0 && (
              <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  {submissions.length} {submissions.length === 1 ? t('contact.submissions.received') : t('contact.submissions.receivedPlural')}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <Card className="border-0 bg-gradient-to-br from-[#1a1a1a]/30 to-[#0a0a0a]/20 relative overflow-hidden">
              <CardContent className="p-6 relative z-10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-[#FCF7F8] mb-2">{t('contact.success.title')}</h3>
                    <p className="text-[#ead3c1]/80">{t('contact.success.description')}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-[#ead3c1] flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {t('contact.form.labels.name')}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('contact.form.placeholders.name')}
                        className="h-12 bg-black/40 border-gray-600/50 text-[#FCF7F8] placeholder:text-gray-400 focus:border-[#ead3c1]/50 focus:ring-[#ead3c1]/20 transition-all duration-200"
                        {...register('name', {
                          required: t('contact.form.validation.nameRequired'),
                          minLength: {
                            value: 2,
                            message: t('contact.form.validation.nameMinLength'),
                          },
                        })}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-400">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-[#ead3c1] flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {t('contact.form.labels.email')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('contact.form.placeholders.email')}
                        className="h-12 bg-black/40 border-gray-600/50 text-[#FCF7F8] placeholder:text-gray-400 focus:border-[#ead3c1]/50 focus:ring-[#ead3c1]/20 transition-all duration-200"
                        {...register('email', {
                          required: t('contact.form.validation.emailRequired'),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('contact.form.validation.emailInvalid'),
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-[#ead3c1] flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        {t('contact.form.labels.message')}
                      </Label>
                      <Textarea
                        id="message"
                        placeholder={t('contact.form.placeholders.message')}
                        className="min-h-32 bg-black/40 border-gray-600/50 text-[#FCF7F8] placeholder:text-gray-400 focus:border-[#ead3c1]/50 focus:ring-[#ead3c1]/20 resize-none transition-all duration-200"
                        {...register('message', {
                          required: t('contact.form.validation.messageRequired'),
                          minLength: {
                            value: 10,
                            message: t('contact.form.validation.messageMinLength'),
                          },
                        })}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-400">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSubmit(onSubmit)}
                      className="w-full h-12 bg-gradient-to-r from-[#ead3c1] to-[#d4b896] hover:from-[#d4b896] hover:to-[#ead3c1] text-black font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          {t('contact.form.buttons.sending')}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          {t('contact.form.buttons.send')}
                        </div>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;